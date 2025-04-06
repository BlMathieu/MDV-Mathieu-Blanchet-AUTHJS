import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responses/BaseResponse";
import { Role } from "../utils/types/UserType";
import AuthenticationService from "../services/AuthenticationService";

const RoleMiddleware = async (authorization: Role[], req: Request, res: Response, next: NextFunction) => {
    try {
        const service = new AuthenticationService();
        const accessToken = req.headers.authorization?.replace('Bearer ', '') as string;
        const dbUser = await service.handleJWTAuth(accessToken);
        const role = dbUser.get('role') as Role;
        if (!authorization.includes(role)) throw new Error("L'utilisateur ne dispose pas du bon rôle !"); next();
    } catch (error) {
        console.error(error);
        if (error instanceof Error) res.send(errorResponse(error.message));
        else res.send(errorResponse("Erreur du serveur lors de la vérification des roles !"))
    }
}
export default RoleMiddleware;