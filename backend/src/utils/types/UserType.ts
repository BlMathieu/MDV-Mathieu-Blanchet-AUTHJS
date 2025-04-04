export type Role = 'étudiant' | 'intervenant';
type UserType = {
    email: string,
    username: string,
    password: string,
    role: Role,
    token?: string,
};
export default UserType;