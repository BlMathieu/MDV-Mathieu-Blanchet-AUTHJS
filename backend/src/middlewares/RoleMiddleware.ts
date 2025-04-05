import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responses/BaseResponse";
import { Role } from "../utils/types/UserType";
import JwtUtils from "../utils/JwtUtils";
import { Model } from "sequelize";
import UserModel from "../model/UserModel";
import TokenType from "../utils/types/TokenType";

const handleAuth = async (accessToken: string): Promise<Model> => {
    const jwtUtils = new JwtUtils();
    if (!accessToken) throw new Error("L'authentification à échoué, token non trouvé !");
    const userPayload = jwtUtils.checkTokenSignature(accessToken, 'access') as TokenType;
    const dbUser = await UserModel.findOne({ where: { email: userPayload.email } });
    if (!dbUser) throw new Error("L'utilisateur n'existe pas !");
    return dbUser;
}

const RoleMiddleware = async (authorization: Role[], req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.replace('Bearer ', '') as string;
        const dbUser = await handleAuth(accessToken);
        const role = dbUser.get('role') as Role;
        if (!authorization.includes(role)) throw new Error("L'utilisateur ne dispose pas du bon rôle !"); next();
    } catch (error) {
        console.error(error);
        if (error instanceof Error) res.send(errorResponse(error.message));
        else res.send(errorResponse("Erreur du serveur lors de la vérification des roles !"))
    }
}
export default RoleMiddleware;