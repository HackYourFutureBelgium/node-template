import query from '../config/db.js';

const createRecipeTable = async () => {
    try {
        const sql = `
        CREATE TABLE IF NOT EXISTS recipes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            ingredients TEXT,
            steps TEXT,
            cookingTime INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    await query(sql);
    console.log('Recipes table created successfully');
    } catch (err) {
        console.error('Error creating recipes table:', err);
        throw err;
    }
};

export default createRecipeTable;