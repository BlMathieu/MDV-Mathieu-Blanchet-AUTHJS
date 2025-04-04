import UserType from '../types/UserType';
import BaseResponse from './BaseResponse';
export default interface UserResponse extends BaseResponse {
    data?: UserType | UserType[],
}

export const userSuccess = (message: string, data?: UserType | UserType[]): UserResponse => {
    return {
        message: message,
        status: true,
        data: data,
    }
}