import query from '../config/db.js';

const createUserTable = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL
            )
        `);
        console.log('table has been created');

        // Check if the table exists
    } catch (err) {
        console.log(err);
    }
};

export default createUserTable;
