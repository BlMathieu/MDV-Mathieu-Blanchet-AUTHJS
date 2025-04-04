type Role = 'étudiant' | 'intervenant';
type UserEntity = {
    email: string,
    username: string,
    password: string,
    role: Role,
};
export default UserEntity;