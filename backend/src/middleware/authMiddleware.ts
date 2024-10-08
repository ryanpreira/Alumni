import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface CustomizaRequest extends Request {
    user?: any
}

export function authenticateJWT(req: CustomizaRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log(token);
    
    if(!token) {
        return res.status(401).json({
            status: 401,
            name: 'Authorization Error',
            message: 'Token não encontrado.'
        })
    }

    try {
        const verified = jwt.verify(token, 'meu_segredo_mais_importante')
        req.user = verified
        next()
    } catch(err) {
        return res.status(403).json({
            status: 403,
            name: 'Forbidden Error',
            message: 'Token inválido.'
        })
    }
}

export function authorizeAdmin(req: CustomizaRequest, res: Response, next: NextFunction) {
    console.log("Verificando usuário:", req.user); // Adicione este log

    if(req.user && req.user.papel === "administrador"){
        return next();
    }
    return res.status(403).json({
        status: 403,
        name: 'Forbidden Error',
        message: 'Acesso restrito ao Administrador.'
    });
}
