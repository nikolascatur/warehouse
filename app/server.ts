import * as Mysql from 'mysql';

export default class DBWrapper {
    private static _instance: DBWrapper;

    cnn: Mysql.Connection;

    private connected: boolean = false;
    constructor() {
        this.cnn = Mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'rootpassword',
            database: 'lomagemi',
        });
        this.connectDb()
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public static executeQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (err: any, results: Object[], fields: any) => {
            if (err) {
                console.log('Query err', err);

                return callback(err);
            }

            if (results.length === 0) {
                callback('No data');
            }

            callback(null, results);
        });
    }

    private connectDb() {
        this.cnn.connect((err: Mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true
            console.log('connected to db')
        })
    }
}
