import mysql from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PWD} from "./const.js";

const pool = mysql.createPool({
    host: DB_HOST,
    port : DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PWD,
});

pool.getConnection().then(res => console.log(`Bien connecté à la base de données : ${res.config.database}`)).catch(err => console.log('ERROR', err));

export default pool;