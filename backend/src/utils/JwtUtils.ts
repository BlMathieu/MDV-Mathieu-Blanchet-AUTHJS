import TokenType, { TokenSignature } from "./types/TokenType";
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtUtils {
    private refreshKey: string;
    private accessKey: string;
    constructor() {
        this.accessKey = process.env.ACCESS_KEY || '';
        this.refreshKey = process.env.REFRESH_KEY || '';
    }

    public getAccessToken(user: TokenType) {
        const delay = 60 * 5;
        const token = jwt.sign(user, this.accessKey, { expiresIn: delay });
        return token
    }

    public getRefreshToken(user: TokenType): string {
        const delay = 60 * 60 * 24
        const token = jwt.sign(user, this.refreshKey, { expiresIn: delay });
        return token
    }

    public checkTokenSignature(token: string, type: TokenSignature): JwtPayload | string {
        if (type === 'access') return jwt.verify(token, this.accessKey, { ignoreExpiration: false });
        else return jwt.verify(token, this.refreshKey, { ignoreExpiration: false });
    }
}