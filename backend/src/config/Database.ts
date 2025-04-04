import mariadb, { Pool, PoolConnection } from 'mariadb';
import 'dotenv/config';
class Database {
    private instance?: PoolConnection;
    private pool: Pool;
    constructor() {
        this.pool = mariadb.createPool({  host: process.env.DB_HOST || '', port: Number(process.env.DB_PORT) || 3306, user: process.env.DB_USER || '', password: process.env.DB_PASSWORD || '', connectionLimit: 5 });
    }

    public async connect(): Promise<void> {
        try {
            this.instance = await this.pool.getConnection();
        } catch (error) {
            console.error(error);
        }
    }
    public getInstance(): PoolConnection {
        if (!this.instance) throw new Error(`L'instance de connexion est null !`);
        return this.instance;
    };
}
export default Database;