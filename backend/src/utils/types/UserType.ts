export type Role = 'étudiant' | 'intervenant' | 'admin';
type UserType = {
    email: string,
    username: string,
    password: string,
    role: Role,
    token?: string,
};
export default UserType;