export interface BaseResponse {
    status: boolean,
    message: string,
}

export default interface AuthenticationResponse extends BaseResponse {
    token: string,
}

export interface OTPResponse extends BaseResponse {
    qrCode: string,
}