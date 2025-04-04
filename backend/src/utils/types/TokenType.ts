import { Role } from "./UserType"

export type TokenSignature = 'refresh' | 'access';

export interface UserPayload {
    username: string,
    email: string,
    role: Role
}

export default interface TokenType extends UserPayload {
    iat: number
}