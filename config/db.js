import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config ();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

console.log('MySQL Pool created successfully');

// Query function
const query = async (sql, values) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Execute the query with provided SQL and values
        const [results] = await connection.query(sql, values);

        // Return the query results
        return results;
    } catch (err) {
        console.error('Database query error:', err.message);
        throw err;  // Rethrow the error to be handled by the caller
    } finally {
        if (connection) {
            // Release the connection back to the pool
            await connection.release();
        }
    }
};

export default connection;
