import bcrypt from 'bcrypt';

export const hashPassword = (plainPassword: string): string => {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10)).toString();
}

export const comparePassword = (plainPassword: string, dbPassword: string): boolean => {
    return bcrypt.compareSync(plainPassword, dbPassword);
}