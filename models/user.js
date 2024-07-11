import query from '../config/db.js';

const createUserTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await query(sql);
        console.log('Users table created successfully');
    } catch (err) {
        console.error('Error creating users table:', err.message);
    }
};

export default createUserTable;
