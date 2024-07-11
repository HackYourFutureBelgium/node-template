import mysql from 'mysql2/promise';

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
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Executing query:', sql);
        const [results, fields] = await connection.query(sql, values);
        console.log('Query executed successfully. ');
        return results;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const testConnection = async () => {
    try {
        const result = await query('SELECT 1');
        console.log('Database connection test successful');
    } catch (err) {
        console.error('Database connection test failed:', err);
    }
};

testConnection();

export default query;
