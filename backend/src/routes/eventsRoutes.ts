
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

router.post('/', authenticateJWT, async (req: CustomizaRequest, res) => {
    const { descricao, nome, imagem, data, hora } = req.body;

    const eventRepository = AppDataSource.getRepository(Event);
    const userRepository = AppDataSource.getRepository(User);

    const idUser = req.user.userId;
    console.log(idUser, descricao);

    if (!idUser || !descricao || !nome || !hora || !data ) {
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
        nome,
        data,
        hora,
        imagem, 
        idUser: existingUser
    });
    
    await eventRepository.save(newEvent);
    res.status(200).json({
        data: newEvent
    });
});

router.put('/:id', authenticateJWT, upload.single("file"), async (req: CustomizaRequest, res) => {
    const { id } = req.params
    const { descricao, nome, imagem, data, hora } = req.body;

    const file = req.file?.filename;

    if (!req.user || typeof req.user.userId !== 'number') {
        return res.status(401).json({
            status: 401,
            name: 'Unauthorized',
            message: 'Usuário não Autenticado.'
        });
    }

    if (parseInt(id) !== req.user.userId && req.user.papel !== 'Administrador') {
        return res.status(403).json({
            status: 403,
            name: 'Forbidden Error',
            message: 'Proibida atualização de dados de terceiros.'
        });
    }

    const eventRepository = AppDataSource.getRepository(Event)

    const event = await eventRepository.findOne({
        where: {
            eventId: parseInt(id)
        }
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


    event.nome = nome || event.nome
    event.descricao = descricao || event.descricao
    event.imagem = imagem || event.imagem
    event.data = data || event.data
    event.hora = imagem || event.hora


    eventRepository.save(event)
    res.status(200).json({
        data: event
    })
})

router.delete('/:id', authenticateJWT, async (req: CustomizaRequest, res) => {
    const eventRepository = AppDataSource.getRepository(Event);

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

    // console.log(req.user.userId);
    // console.log(post.idUser.id)

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
