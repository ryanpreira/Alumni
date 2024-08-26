import { Router } from 'express'
import { AppDataSource } from '../DataSource'
import { User } from '../entity/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', async (req, res) => {
    const { email, senha } = req.body
    
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ email })
    
    if(user && bcrypt.compareSync(senha, user.senha)) {
    
    const token = jwt.sign({
        userId: user.id,
        acesso_tipo: user.acesso_tipo
        }, 'meu_segredo_mais_importante', { expiresIn: '1h' })

        res.status(200).json({ data: {
            email: user.email,
            acesso_tipo: user.acesso_tipo,
            jwt: token
        }})

    } else {
        return res.status(401).json({
            status: 401,
            name: 'Authorization Error',
            message: 'Usuário ou senha inválido.'
        })
    }
})

router.get('/logout', (req, res) => {
    res.status(200).json({
        data: {
            message: "Logout realizado com sucesso."
        }
    })
})

export default router