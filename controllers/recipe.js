import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const { rows } = await query('SELECT * FROM recipes');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOneRecipe: async (req, res) => {},
    postRecipe: async (req, res) => {
        try{
            const{rows}=await query('INSERT INTO RECIPES(id,name, description,image,name,ingredients,steps) VALUES()')
        }
    },
    updateRecipe: async (req, res) => {},
    deleteRecipe: async (req, res) => {}
};

export default recipeControllers;
