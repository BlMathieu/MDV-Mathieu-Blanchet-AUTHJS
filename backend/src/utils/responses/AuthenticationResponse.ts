import BaseResponse from "./BaseResponse"

export default interface AuthenticationResponse extends BaseResponse {
    token?: string
}

export const authSuccess = (message: string, token?: string): AuthenticationResponse => {
    return {
        status: true,
        message: message,
        token: token,
    }
}
