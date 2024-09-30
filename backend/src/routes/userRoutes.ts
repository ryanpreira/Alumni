import { authenticateJWT, authorizeAdmin, CustomizaRequest } from '../middleware/authMiddleware';
import { Router } from 'express'
import { Request, Response } from 'express';
import { AppDataSource } from '../DataSource'
import { User } from '../entity/User'
import bcrypt from 'bcryptjs'
import { Post } from '../entity/Post';
import multer from 'multer';
import { storage } from '../multerConfig';

const router = Router();
const upload = multer({ storage: storage });

// router.use(authenticateJWT)

router.get('/', authenticateJWT, authorizeAdmin, async (req, res) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    res.json({
        data: users
    })
});

router.get('/:id', authenticateJWT, async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);

    const user = await userRepository.findOne({
        where: {
        id: parseInt(req.params.id),
    },
    relations: ["posts"]
});

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: 'Usuário não encontrado'
        });
    }

});



router.post('/', upload.single("file"), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);

        const { nome, sobrenome, email, senha, confirmarSenha, formacao, tags, events, bio, ano, matriculaCPF, papel } = data;

        const file = req.file?.filename;

        if (!nome || !sobrenome || !email || !senha || !confirmarSenha || !formacao || !ano || !matriculaCPF || !papel) {
            return res.status(400).json({
                error: {
                    status: 400,
                    name: 'Validation error',
                    message: 'Preencha todos os campos.'
                }
            });
        }

        if (senha !== confirmarSenha) {
            return res.status(400).json({
                error: {
                    status: 400,
                    name: 'Validation error',
                    message: 'As senhas não coincidem.'
                }
            });
        }

        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOneBy({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email já está em uso.'
            });
        }

        const hashedPassword = bcrypt.hashSync(senha, 10);

        const newUser: User = userRepository.create({
            nome,
            sobrenome,
            email,
            senha: hashedPassword,
            confirmarSenha: hashedPassword,
            formacao,
            tags,
            bio,
            ano,
            matriculaCPF,
            papel,
            file,
            events
        });

        await userRepository.save(newUser);

        return res.status(200).json({
            data: newUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }
});


router.put('/:id', authenticateJWT, upload.single("file"), async (req: CustomizaRequest, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, senha, confirmarSenha, bio, formacao, tags, events, ano, matriculaCPF, papel } = req.body;

    const file = req.file?.filename;

    // Verifica se o usuário está autenticado
    if (!req.user || typeof req.user.userId !== 'number') {
        return res.status(401).json({
            status: 401,
            name: 'Unauthorized',
            message: 'Usuário não autenticado.'
        });
    }

    // Verifica se o usuário tem permissão para atualizar os dados
    if (parseInt(id) !== req.user.userId && req.user.papel !== 'administrador') {
        return res.status(403).json({
            status: 403,
            name: 'Forbidden Error',
            message: 'Proibida atualização de dados de terceiros.'
        });
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where: {
            id: parseInt(id)
        }
    });

    // Verifica se o usuário existe
    if (!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'Usuário não encontrado.'
            }
        });
    }

    // Verifica se o email já está em uso por outro usuário
    const existingUser = await userRepository.findOneBy({ email: req.body.email });
    if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({
            message: 'Email já está em uso.'
        });
    }

    // Atualiza os campos do usuário
    user.nome = nome || user.nome;
    user.sobrenome = sobrenome || user.sobrenome;
    user.email = email || user.email;
    user.formacao = formacao || user.formacao;
    user.tags = tags || user.tags;
    user.bio = bio || user.bio;
    user.ano = ano || user.ano;
    user.matriculaCPF = matriculaCPF || user.matriculaCPF;
    user.file = file || user.file;
    user.events = events || user.events;

    // Verifica se o campo "senha" foi enviado
    if (senha) {
        // Verifica se a senha e a confirmação de senha coincidem
        if (senha !== confirmarSenha) {
            return res.status(400).json({
                error: {
                    status: 400,
                    name: 'Validation error',
                    message: 'As senhas não coincidem.'
                }
            });
        }

        // Aplica o hash na nova senha
        const hashedPassword = bcrypt.hashSync(senha, 10);
        user.senha = hashedPassword;
    }

    // Salva as atualizações no banco de dados
    await userRepository.save(user);

    // Retorna o usuário atualizado
    return res.status(200).json({
        data: user
    });
});


router.delete('/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
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
