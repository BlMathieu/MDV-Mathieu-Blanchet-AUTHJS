export default interface BaseResponse {
    status: boolean,
    message: string,
}
export const errorResponse = (message: string): BaseResponse => {
    return {
        status: false,
        message: message,
    }
}