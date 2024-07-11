import query from '../config/db.js';

const createRecipeTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS recipes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            ingredients TEXT NOT NULL,
            instructions TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `;
    try {
        await query(sql);
        console.log('Recipes table created successfully');
    } catch (err) {
        console.error('Error creating recipes table:', err.message);
    }
};

export default createRecipeTable;
