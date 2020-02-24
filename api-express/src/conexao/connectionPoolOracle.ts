import * as oracledb from "oracledb"
import * as dotenv from 'dotenv';

class Connection {
    constructor() {
        this.init();

    }
    public async init() {
        dotenv.config();
        try {
            await oracledb.createPool({
                user: process.env.ORACLE_USER,
                password: process.env.ORACLE_PASSWORD,
                connectString: process.env.CONNECT_STRING,
            });
            console.log('Connection pool started');

            await this.dostuff();

        } catch (err) {
            console.error('init() error: ' + err.message);
        }
    }

    public async closePoolAndExit() {
        console.log('\nTerminating');
        try {
            await oracledb.getPool().close();
            console.log('Pool closed');
            process.exit(0);
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }

    private async dostuff() {
        let connection;
        try {
            connection = await oracledb.getConnection();
            const sql = `SELECT sysdate FROM dual WHERE :b = 1`;
            const binds = [1];
            const result = await connection.execute(sql, binds);
            console.log(result);
        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}

export default new Connection();

