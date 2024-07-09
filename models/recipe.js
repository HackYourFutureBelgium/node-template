import query from '../config/db.js';

const createRecipeTable = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS recipes(
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                image TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                steps TEXT NOT NULL,
                user_id INTEGER NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
    } catch (err) {
        console.log(err);
    }
};

export default createRecipeTable;
