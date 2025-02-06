import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

export type JwtPayload = {
    name: string
    id: string
}

export const loginRequired = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {authorization} = req.headers
    if(!authorization) {
        res.status(401).json({
            message: "Usuário não logado"
        })
        return
    }
    const token = authorization.split(' ')[1]
    const { name, id } = jwt.verify(token, process.env.JWT_PASS || '') as JwtPayload

    const user: JwtPayload = {
        name,
        id
    }
    req.body.user = user
    return next()
}