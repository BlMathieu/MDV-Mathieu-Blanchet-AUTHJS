import { DataTypes } from 'sequelize';
import client from '../config/Database';

const Users = client.define('users', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refresh_token: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'étudiant',
        validate: {
            isIn: [['étudiant', 'intervenant', 'admin']],
        }
    },
    mfaValidated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    mfaSecret: {
        type: DataTypes.STRING,
    }
});

export default Users;