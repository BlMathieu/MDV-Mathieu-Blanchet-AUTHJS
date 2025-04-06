import { Model } from "sequelize";
import UserModel from "../model/UserModel";
import { comparePassword, hashPassword } from "../utils/BcryptUtils";
import JwtUtils from "../utils/JwtUtils";
import TokenType from "../utils/types/TokenType";
import UserType, { Role } from "../utils/types/UserType";
import * as OTPAuth from 'otpauth';

export default class AuthenticationService {
    private jwtUtils: JwtUtils;
    constructor() {
        this.jwtUtils = new JwtUtils();
    }

    public async logUser(email: string, plainPassword: string): Promise<{ access: string, refresh: string }> {
        const dbUser = await UserModel.findOne({ where: { email: email } });
        if (!dbUser) throw new Error("Information invalide !");

        const hashedPassword: string = dbUser.get('password') as string;
        if (!comparePassword(plainPassword, hashedPassword)) throw new Error('Information invalide !');

        const payload: TokenType = {
            username: dbUser.get('username') as string,
            email: dbUser.get('email') as string,
            role: dbUser.get('role') as Role,
            mfaValidated: dbUser.get('mfaValidated') as boolean,
        };

        const accessToken = this.jwtUtils.getAccessToken(payload);
        const refreshToken = this.jwtUtils.getRefreshToken(payload);
        await dbUser.update({ 'refresh_token': refreshToken }, { where: { email: email } });
        return { access: accessToken, refresh: refreshToken };
    }

    public async registerUser(user: UserType): Promise<void> {
        user.password = hashPassword(user.password);
        await UserModel.create(user);
    }

    public async logoutUser(refresh: string): Promise<void> {
        if (!refresh) throw new Error('Token invalide !');
        const userPayload = this.jwtUtils.checkTokenSignature(refresh, 'refresh') as TokenType;
        const dbUser = await UserModel.findOne({ where: { email: userPayload.email } });
        if (!dbUser) throw new Error('Aucun utilisateur trouvé !');
        const email = dbUser.get('email') as string;
        await dbUser.update({ 'refresh_token': '', 'mfaValidated': false }, { where: { email: email } })
    }

    public async refreshUser(token: string): Promise<string> {
        if (!token) throw new Error('Aucun token trouvé !');
        const refreshPayload = this.jwtUtils.checkTokenSignature(token, 'refresh') as TokenType;
        const dbUser = await UserModel.findOne({ where: { email: refreshPayload.email } });
        if (dbUser?.get('refresh_token') != token) throw new Error('Refresh token incorrect !');
        const newPayload: TokenType = {
            username: dbUser.get('username') as string,
            email: dbUser.get('email') as string,
            role: dbUser.get('role') as Role,
            mfaValidated: dbUser.get('mfaValidated') as boolean,
        }
        const access = this.jwtUtils.getAccessToken(newPayload);
        return access;
    }

    public async handleJWTAuth(accessToken: string): Promise<Model> {
        const jwtUtils = new JwtUtils();
        if (!accessToken) throw new Error("L'authentification à échoué, token non trouvé !");
        const userPayload = jwtUtils.checkTokenSignature(accessToken, 'access') as TokenType;
        const dbUser = await UserModel.findOne({ where: { email: userPayload.email } });
        if (!dbUser) throw new Error("L'utilisateur n'existe pas !");
        return dbUser;
    }

    public async handleOTPAuth(user: Model, secret: string): Promise<{ access: string, refresh: string }> {
        const jwtUtils = new JwtUtils();
        const email = user.get('email') as string;
        const dbSecret = user.get('mfaSecret') as string;
        const totp = new OTPAuth.TOTP({
            issuer: 'MFA-OTP',
            label: email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(dbSecret)
        });
        totp.validate({ token: secret, timestamp: Date.now() });

        const payload: TokenType = {
            email: email,
            username: user.get('username') as string,
            role: user.get('role') as Role,
            mfaValidated: true,
        }
        const accessToken = jwtUtils.getAccessToken(payload);
        const refreshToken = jwtUtils.getRefreshToken(payload);
        await user.update({ 'refresh_token': refreshToken, 'mfaValidated': true }, { where: { email: email } })
        return { access: accessToken, refresh: refreshToken };
    }
}