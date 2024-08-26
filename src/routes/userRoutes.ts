import { authenticateJWT, authorizeAdmin, CustomizaRequest } from '../middleware/authMiddleware';
import { Router } from 'express'
import { Request, Response } from 'express';
import { AppDataSource } from '../DataSource'
import { User } from '../entity/User'
import bcrypt from 'bcryptjs'

const router = Router();

router.use(authenticateJWT)

router.get('/', authorizeAdmin, async (req, res) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json({
        data: users
    })
});

router.get('/:id', authorizeAdmin, async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
        id: parseInt(req.params.id),
    },
});

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: 'Usuário não encontrado'
        });
    }

});



router.post('/', authorizeAdmin, async (req, res) => {
    const { nome, email, senha, acesso_tipo } = req.body

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({
            message: 'Email já está em uso.'
        });
    }

    if(!nome || !email || !senha || !acesso_tipo) {
        return res.status(400).json({
            error: {
                status: 400,
                name: 'Validation error',
                message: 'Preencha todos os campos.'
            }
        })
    }

    const hashedPassword = bcrypt.hashSync(senha, 10)

    const newUser: User = userRepository.create({
        nome,
        email,
        acesso_tipo,
        senha: hashedPassword,
    })

    await userRepository.save(newUser)
    res.status(200).json({
        data: newUser
    })
});


router.put('/:id', async (req: CustomizaRequest, res) => {
    const { id } = req.params
    const { nome, email, acesso_tipo, senha } = req.body

    if (!req.user || typeof req.user.userId !== 'number') {
        return res.status(401).json({
            status: 401,
            name: 'Unauthorized',
            message: 'Usuário não Autenticado.'
        });
    }

    if (parseInt(id) !== req.user.userId && req.user.acesso_tipo !== 'Administrador') {
        return res.status(403).json({
            status: 403,
            name: 'Forbidden Error',
            message: 'Proibida atualização de dados de terceiros.'
        });
    }

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: parseInt(id)
        }
    })


    if(!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'Usuário não encontrado.'
            }
        })
    }

    const existingUser = await userRepository.findOneBy({ email: req.body.email });
    if (existingUser === req.body.email) {
        return res.status(400).json({
            message: 'Email já está em uso.'
        });
    }

    user.nome = nome || user.nome
    user.email = email || user.email
    if (senha) {
        user.senha = bcrypt.hashSync(senha, 10);
    }
    user.acesso_tipo = acesso_tipo || user.acesso_tipo


    userRepository.save(user)
    res.status(200).json({
        data: user
    })
})

router.delete('/:id', authorizeAdmin, async (req, res) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });

    if (user) {
    await userRepository.delete({
        id: parseInt(req.params.id)
    });
    res.status(200).json({
        message: 'Usuário removido.'
    });
    } else {
    res.status(404).json({
        message: 'Usuário não encontrado.'
    });
    }
});

export default router;
