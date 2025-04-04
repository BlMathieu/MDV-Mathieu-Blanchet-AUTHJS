import { Router, Request, Response } from "express";
import AbstractController from "./AbstractController";
import AuthenticationService from "../services/AuthenticationService";
import { authSuccess } from "../utils/responses/AuthenticationResponse";
import UserType from "../utils/types/UserType";

export default class AuthenticatorController extends AbstractController {
    private service: AuthenticationService;
    constructor() {
        super();
        this.service = new AuthenticationService();
    }

    public getRoutes(): Router {
        this.router.post('/login', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const { email, password } = req.body;
                const tokens = await this.service.logUser(email, password);
                res.cookie('refresh_token', tokens.refresh, { httpOnly: true, sameSite: 'lax' });
                return authSuccess(`L'utilisateur est connecté !`, tokens.access);
            }, res);
        });
        this.router.post('/register', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const user: UserType = req.body;
                await this.service.registerUser(user);
                return authSuccess(`L'utilisateur ${user.username} à bien été enregistré`);
            }, res);
        });
        this.router.post('/refresh', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const refresh = req.cookies['refresh_token'];
                console.log(refresh)
                const access = await this.service.refreshUser(refresh);
                return authSuccess('Utilisateur ré-authentifier !', access);
            }, res)
        });
        this.router.post('/logout', (_req: Request, res: Response) => {
            this.errorHandler(() => {
                res.clearCookie('refresh_token');
                return authSuccess("L'utilisateur à bien été déconnecté !");
            }, res);
        })
        return this.router
    }
}