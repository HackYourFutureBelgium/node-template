import connection from '../config/db.js';


// models/recipe.js


const createRecipeTable = async () => {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS recipes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users2(id)
            )
        `);
    } catch (err) {
        console.error('Error creating recipes table:', err);
    }
};

export default createRecipeTable;
