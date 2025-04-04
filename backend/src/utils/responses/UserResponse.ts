import UserEntity from '../../entities/UserEntity';
import BaseResponse from './BaseResponse';
export default interface UserResponse extends BaseResponse {
    data?: UserEntity,
}

export const userSuccess = (message: string, data?: UserEntity): UserResponse => {
    return {
        message: message,
        status: true,
        data: data,
    }
}