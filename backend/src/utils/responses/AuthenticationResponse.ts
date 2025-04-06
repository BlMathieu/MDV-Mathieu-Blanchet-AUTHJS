import BaseResponse from "./BaseResponse"

export default interface AuthenticationResponse extends BaseResponse {
    token?: string
}
interface OtpResponse extends BaseResponse {
    qrCode: string,
}

export const authSuccess = (message: string, token?: string): AuthenticationResponse => {
    return {
        status: true,
        message: message,
        token: token,
    }
}

export const otpSuccess = (message: string, qr: string): OtpResponse => {
    return {
        status: true,
        message: message,
        qrCode: qr
    }
}