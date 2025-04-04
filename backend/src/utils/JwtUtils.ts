import TokenType, { TokenSignature, UserPayload } from "./types/TokenType";
import UserType from "./types/UserType";
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtService {
    private refreshKey: string;
    private accessKey: string;
    constructor() {
        this.accessKey = process.env.ACCESS_KEY || '';
        this.refreshKey = process.env.REFRESH_KEY || ''
    }

    public getAcessToken(user: UserPayload) {
        const payload: TokenType = {
            ...user,
            iat: Date.now() + 1000 * 30,
        }
        const token = jwt.sign(payload, this.accessKey);
        return token
    }

    public getRefreshToken(user: UserPayload): string {
        const payload: TokenType = {
            username: user.username,
            email: user.email,
            role: user.role,
            iat: Date.now() + 1000 * 60 * 60 * 24,
        }
        const token = jwt.sign(payload, this.refreshKey);
        return token
    }

    public checkTokenSignature(token: string, type: TokenSignature): JwtPayload | string {
        if (type === 'access') return jwt.verify(token, { key: process.env.ACCESS_KEY || '' });
        else return jwt.verify(token, { key: process.env.REFRESH_KEY || '' });
    }
}