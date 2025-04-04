import { Sequelize } from 'sequelize';
import 'dotenv/config';
const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbUrl = process.env.DB_URL || '';
const client = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbUrl,
  dialect: 'mariadb',
  define: {
    timestamps: false,
  }
});
export default client;