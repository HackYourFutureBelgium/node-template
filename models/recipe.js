import query from '../config/db.js';

const createRecipeTable = async () => {
    try {
        const createRecipeTable= `CREATE TABLE IF NOT EXISTS recipes{
        id        INT PRIMARY KEY AUTO_INCREMENT,
        description TEXT NOT NULL
        }`;
        const result = await query(createRecipeTable);
        console.log(`Recipe table created successfully...`);
    } catch (err) {
        console.log(err);
    }
};

export default createRecipeTable;