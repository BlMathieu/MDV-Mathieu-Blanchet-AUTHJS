import { Router, Request, Response } from "express";
import AbstractController from "./AbstractController";
import AuthenticationService from "../services/AuthenticationService";
import { authSuccess, otpSuccess } from "../utils/responses/AuthenticationResponse";
import UserType from "../utils/types/UserType";
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';
import { loginValidator, registerValidator } from "../middlewares/ValidtorMiddleware";
export default class AuthenticatorController extends AbstractController {
    private service: AuthenticationService;
    constructor() {
        super();
        this.service = new AuthenticationService();
    }

    public getRoutes(): Router {
        this.router.post('/login', loginValidator, (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const { email, password } = req.body;
                const tokens = await this.service.logUser(email, password);
                res.cookie('refresh_token', tokens.refresh, { httpOnly: true, sameSite: 'lax' });
                return authSuccess(`L'utilisateur est connecté !`, tokens.access);
            }, res);
        });
        this.router.post('/register', registerValidator, (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const user: UserType = req.body;
                await this.service.registerUser(user);
                return authSuccess(`L'utilisateur ${user.username} à bien été enregistré`);
            }, res);
        });
        this.router.post('/refresh', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const refresh = req.cookies['refresh_token'];
                const access = await this.service.refreshUser(refresh);
                return authSuccess('Utilisateur ré-authentifier !', access);
            }, res)
        });
        this.router.post('/logout', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const refresh = req.cookies['refresh_token'];
                await this.service.logoutUser(refresh);
                res.clearCookie('refresh_token');
                return authSuccess("L'utilisateur à bien été déconnecté !");
            }, res);
        });

        this.router.get('/otp', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const accessToken = req.headers.authorization?.replace('Bearer ', '') as string;
                const user = await this.service.handleJWTAuth(accessToken);
                const email = user.get('email') as string;
                const totp = new OTPAuth.TOTP({
                    issuer: 'MFA-OTP',
                    label: email,
                    algorithm: 'SHA1',
                    digits: 6,
                    period: 30
                });
                await user.update({ 'mfaSecret': totp.secret.base32 }, { where: { email: email } });
                const qrCode = await QRCode.toDataURL(totp.toString());
                return otpSuccess(`Génération qrcode réussi !`, qrCode);
            }, res);
        });

        this.router.post('/otp', (req: Request, res: Response) => {
            this.errorHandler(async () => {
                const { secret } = req.body;
                const accessToken = req.headers.authorization?.replace('Bearer ', '') as string;
                const user = await this.service.handleJWTAuth(accessToken);
                const tokens = await this.service.handleOTPAuth(user, secret);
                res.cookie('refresh_token', tokens.refresh, { httpOnly: true, sameSite: 'lax' });
                return authSuccess('MFAOTP réussi !', tokens.access);
            }, res);
        })
        return this.router
    }
}