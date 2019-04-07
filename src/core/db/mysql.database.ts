import { Connection, createConnection } from "mysql2";

export default class MySQLDatabase {
    public static connection: Connection;

    public static getConnection(): Connection {
        if (!this.connection) {
            this.init();
        }

        return this.connection;
    }

    private static init() {
        this.connection = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
    }
}
