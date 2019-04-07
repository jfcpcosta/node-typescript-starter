export default class User {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    lastLogin: Date;

    constructor(row: any = null) {
        if (row) {
            this.id = row.id;
            this.username = row.username;
            this.password = row.password;
            this.name = row.name;
            this.email = row.email;
            this.lastLogin = new Date(row.last_login);
        }
    }
}
