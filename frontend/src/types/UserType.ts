import { BaseResponse } from "./AuthenticationResponse";

export type Role = 'admin' | 'intervenant' | 'étudiant';
export default interface UserType {
    email: string,
    username: string,
    password: string,
    role: Role,
    refreshToken: string,
    mfaValidated: boolean,
    mfaSecret: string,
}

export interface UserToken {
    email: string,
    username: string,
    role: Role,
    mfaValidated: boolean
}

export interface UserCredentials {
    email: string,
    password: string,
}

export interface UserResponse extends BaseResponse {
    data?: UserType | UserType[],
}