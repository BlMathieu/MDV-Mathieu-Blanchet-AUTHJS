import UserModel from "../model/UserModel";
import { comparePassword, hashPassword } from "../utils/BcryptUtils";
import JwtUtils from "../utils/JwtUtils";
import TokenType from "../utils/types/TokenType";
import UserType, { Role } from "../utils/types/UserType";

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

    public async refreshUser(token: string): Promise<string> {
        if (!token) throw new Error('Aucun token trouvé !');
       
        const payload = this.jwtUtils.checkTokenSignature(token, 'refresh') as TokenType;
        const dbUser = await UserModel.findOne({ where: { email: payload.email } });
        if (dbUser?.get('refresh_token') != token) throw new Error('Refresh token incorrect !');
       
        const access = this.jwtUtils.getAccessToken(payload);
        return access;
    }
}