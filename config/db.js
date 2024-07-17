import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

//construct path
const __filename=fileURLToPath(import.meta.url);
const PATH=dirname(__filename);
dotenv.config({ path:path.join(PATH, '../.env')});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

console.log('MySQL Pool created successfully');

// Create query
const query = async (sql, values) => {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (err) {
        return err;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

export default query;
