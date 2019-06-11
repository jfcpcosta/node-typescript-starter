import { createHash } from "crypto";
import { FieldPacket, QueryError } from "mysql";
import MySQLDatabase from "../core/db/mysql.database";
import User from "../models/user";

export default class UsersRepository {

    public static async findAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            MySQLDatabase.getConnection().execute(
                "SELECT * FROM users",
                [],
                (err: QueryError, rows: any[], fields: FieldPacket[]) => {
                    const customers: User[] = [];
                    rows.forEach(row => customers.push(new User(row)));
                    resolve(customers);
                }
            );
        });
    }

    public static async findOne(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            MySQLDatabase.getConnection().execute(
                "SELECT * FROM users WHERE id = ? LIMIT 1",
                [id],
                (err: QueryError, rows: any[], fields: FieldPacket[]) => {
                    if (rows.length > 0) {
                        resolve(new User(rows[0]));
                    }
                    reject(new Error("User not found."));
                }
            );
        });
    }

    public static async create(data: any): Promise<User> {
        return new Promise((resolve, reject) => {
            MySQLDatabase.getConnection().execute(
                `INSERT INTO users (
                    username, password, name, email
                ) VALUES (
                    ?, ?, ?, ?
                )`,
                [data.username, createHash("sha256").update(data.password).digest("hex"), data.name, data.email],
                (err: QueryError, rows: any, fields: FieldPacket[]) => {
                    if (rows.insertId > 0) {
                        resolve(new User({
                            id: rows.insertId,
                            ...data
                        }));
                    }
                    reject(new Error("Error creating user."));
                }
            );
        });
    }

    public static async update(id: number, data: any): Promise<User> {
        return new Promise((resolve, reject) => {
            MySQLDatabase.getConnection().execute(
                `UPDATE users SET
                    username = ?, password = ?, name = ?, email = ?
                WHERE id = ?`,
                [data.username, createHash("sha256").update(data.password).digest("hex"), data.name, data.email, id],
                (err: QueryError, rows: any, fields: FieldPacket[]) => {
                    if (rows.affectedRows > 0) {
                        resolve(new User({
                            id,
                            ...data
                        }));
                    }
                    reject(new Error("Customer not found."));
                }
            );
        });
    }

    public static async delete(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            const user = this.findOne(id);

            MySQLDatabase.getConnection().execute(
                `DELETE FROM users WHERE id = ?`,
                [id],
                (err: QueryError, rows: any, fields: FieldPacket[]) => {
                    if (rows.affectedRows > 0) {
                        resolve(user);
                    }
                    reject(new Error("User not found."));
                }
            );
        });
    }
}
