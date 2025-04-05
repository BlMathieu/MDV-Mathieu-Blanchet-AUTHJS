import { Role } from "./UserType"

export type TokenSignature = 'refresh' | 'access';

export default interface TokenType {
    username: string,
    email: string,
    role: Role
}