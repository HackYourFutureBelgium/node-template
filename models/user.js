import connection from '../config/db.js';


// models/user.js

const createUserTable = async () => {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users2 (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);
    } catch (err) {
        console.error('Error creating users2 table:', err);
    }
};

export default createUserTable;
