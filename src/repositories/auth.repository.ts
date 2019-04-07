import { createHash } from "crypto";
import { sign } from "jsonwebtoken";
import { FieldPacket, QueryError } from "mysql";
import MySQLDatabase from "../core/db/mysql.database";
import User from "../models/user";

export default class AuthRepository {

    public static async doLogin(username: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            MySQLDatabase.getConnection().execute<any>(
                "SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1",
                [username, createHash("sha256").update(password).digest("hex")],
                (err: QueryError, rows: User[], fields: FieldPacket[]) => {
                    if (rows.length === 1) {
                        const token = sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            username: rows[0].username,
                            email: rows[0].email,
                            user_id: rows[0].id
                        }, process.env.JWT_SECRET);
                        resolve(token);
                    }
                    reject(new Error("Bad Credentials."));
                });
        });
    }
}