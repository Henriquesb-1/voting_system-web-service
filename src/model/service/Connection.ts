import mySql, { RowDataPacket } from "mysql2/promise";
import Transaction from "./Transaction";

export default class Connection {
    private _connection: Promise<mySql.Connection>;

    public constructor() {
        this._connection = this.openConnection();
    }

    private openConnection(): Promise<mySql.Connection> {
        const user = process.env.DB_user;
        const password = process.env.DB_password;
        const database = process.env.DB_database;
        const host = process.env.DB_host;

        return mySql.createConnection({user, password, database, host});
    }

    public async query(sql: string, params?: any[]) {
        try {
            const [result] = <RowDataPacket[]> await (await this._connection).query(sql, params);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async closeConnection() {
        try {
            (await this._connection).end();
        } catch (error) {
            throw error;
        }
    }

    public async transaction(transaction: Transaction) {
        switch(transaction) {
            case Transaction.BEGIN:
                (await this._connection).beginTransaction();
            break;

            case Transaction.COMMIT:
                (await this._connection).commit();
            break;

            case Transaction.ROLLBACK:
                (await this._connection).commit();
            break;
        }
    }
}