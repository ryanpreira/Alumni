
import { authenticateJWT, authorizeAdmin, CustomizaRequest } from '../middleware/authMiddleware';
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { AppDataSource } from '../DataSource'
import { Post } from '../entity/Post'
import { User } from '../entity/User'

const router = Router()

router.get('/', async (req, res) => {
    const postRepository = AppDataSource.getRepository(Post);

    const posts = await postRepository.find({
        relations: ["idUser"]
    });

    res.json({
        data: posts
    })
})

router.get('/:id', async (req, res) => {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
        where: { postId: parseInt(req.params.id) },
        relations: ["idUser"]
    });

    if(!post) {
        return res.status(404).json({
            message: 'Publicação não encontrada.'
        })
    }
    else {
        return res.status(200).json({
            data: post
        })
    }
})

router.post('/', authenticateJWT, async (req: CustomizaRequest, res) => {
    const { conteudo } = req.body;

    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);

    const idUser = req.user.userId;
    console.log(idUser, conteudo);

    if (!idUser || !conteudo) {
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

    const newPost: Post = postRepository.create({
        idUser: existingUser,
        conteudo
    });
    
    await postRepository.save(newPost);
    res.status(200).json({
        data: newPost
    });
});

router.delete('/:id', authenticateJWT, async (req: CustomizaRequest, res) => {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
        where: { postId: parseInt(req.params.id) },
        relations: ["idUser"]
    });

    if (!post) {
        return res.status(404).json({
            message: 'Publicação não encontrada.'
        });
    }

    const idUser = req.user.userId;

    // console.log(req.user.userId);
    // console.log(post.idUser.id)

    if (post.idUser.id !== idUser) {
        return res.status(400).json({
            message: 'Remova uma publicação sua.'
        });
    }

    await postRepository.delete({ postId: parseInt(req.params.id) });
    res.status(200).json({
        message: 'Publicação removida.'
    });
});

export default router
