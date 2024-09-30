
import { authenticateJWT, authorizeAdmin, CustomizaRequest } from '../middleware/authMiddleware';
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { AppDataSource } from '../DataSource'
import { User } from '../entity/User'
import { Event } from '../entity/Event'
import multer from 'multer';
import { storage } from '../multerConfig';


const router = Router()
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    const eventRepository = AppDataSource.getRepository(Event);

    const events = await eventRepository.find({
        relations: ["idUser"]
    });

    res.json({
        data: events
    })
})

router.get('/:id', async (req, res) => {
    const eventRepository = AppDataSource.getRepository(Event);

    const event = await eventRepository.findOne({
        where: { eventId: parseInt(req.params.id) },
        relations: ["idUser"]
    });

    if(!event) {
        return res.status(404).json({
            message: 'Evento não encontrado.'
        })
    }
    else {
        return res.status(200).json({
            data: event
        })
    }
})

router.post('/', authenticateJWT, upload.single("imagem"), async (req: CustomizaRequest, res) => {
    try {
        // Agora, apenas acessamos os dados do req.body normalmente.
        const { descricao, nomeEvento, dataEvento, hora, modalidade } = req.body;
        const imagem = req.file?.filename;

        const eventRepository = AppDataSource.getRepository(Event);
        const userRepository = AppDataSource.getRepository(User);

        const idUser = req.user.userId;
        console.log(idUser, descricao);

        if (!idUser || !descricao || !nomeEvento || !hora || !dataEvento || !modalidade) {
            return res.status(400).json({
                error: {
                    status: 400,
                    name: 'Validation error',
                    message: 'Preencha todos os campos.'
                }
            });
        }

        const existingUser = await userRepository.findOneBy({ id: idUser });
        if (!existingUser) {
            return res.status(400).json({
                message: 'Usuário não encontrado.'
            });
        }

        const newEvent: Event = eventRepository.create({
            descricao,
            nomeEvento,
            dataEvento,
            hora,
            imagem, 
            modalidade,
            idUser: existingUser
        });
        
        await eventRepository.save(newEvent);
        res.status(200).json({
            data: newEvent
        });
    } catch (error) {
        res.status(500).json({
            error: {
                status: 500,
                message: 'Erro no servidor.',
            }
        });
    }
});


router.put('/:id', authenticateJWT, upload.single("imagem"), async (req: CustomizaRequest, res) => {
    const eventRepository = AppDataSource.getRepository(Event)

    const eventId = req.params.id;
    const { descricao, nomeEvento, dataEvento, hora, modalidade } = req.body;
    const imagem = req.file?.filename;

    if (!req.user || typeof req.user.userId !== 'number') {
        return res.status(401).json({
            status: 401,
            name: 'Unauthorized',
            message: 'Usuário não Autenticado.'
        });
    }

    const event = await eventRepository.findOne({
        where: { eventId: parseInt(eventId) },
        relations: ['idUser']
    })

    if(!event) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'Evento não encontrado.'
            }
        })
    }

    if (event.idUser.id !== req.user.userId && req.user.papel !== 'Administrador') {
            return res.status(403).json({
            status: 403,
            name: 'Forbidden Error',
            message: 'Proibida atualização de dados de terceiros.'
        });
    }

    event.nomeEvento = nomeEvento || event.nomeEvento
    event.descricao = descricao || event.descricao
    event.imagem = imagem || event.imagem
    event.dataEvento = dataEvento || event.dataEvento
    event.hora = hora || event.hora


    await eventRepository.save(event)
    res.status(200).json({
        data: event
    })
})

router.delete('/:id', authenticateJWT, async (req: CustomizaRequest, res) => {
    const eventRepository = AppDataSource.getRepository(Event);
    const eventId = req.params.id;

    const event = await eventRepository.findOne({
        where: { eventId: parseInt(req.params.id) },
        relations: ["idUser"]
    });

    if (!event) {
        return res.status(404).json({
            message: 'Evento não encontrado.'
        });
    }

    const idUser = req.user.userId;

    if (event.idUser.id !== idUser) {
        return res.status(400).json({
            message: 'Remova um evento seu.'
        });
    }

    await eventRepository.delete({ eventId: parseInt(req.params.id) });
    res.status(200).json({
        message: 'Publicação removida.'
    });
});

export default router
