import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const { rows } = await query('SELECT * FROM recipes');

            if (!rows || rows.length === 0) {
                return res.status(404).json({ message: 'No recipes found' });
            }
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOneRecipe: async (req, res) => {
        try {
            const { id } = req.params;
            const { rows } = await query(
                'SELECT * FROM recipes WHERE id = $1',
                [id]
            );
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    postRecipe: async (req, res) => {
        try {
            const {
                name: recipeName,
                description,
                image,
                ingredients,
                steps
            } = req.body;

            const { rows } = await query(
                'INSERT INTO recipes(name, description, image, ingredients, steps) VALUES (?, ?, ?, ?, ?) RETURNING *',
                [recipeName, description, image, ingredients, steps]
            );
            res.status(201).json({ message: 'Recipe created' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateRecipe: async (req, res) => {},
    deleteRecipe: async (req, res) => {}
};

export default recipeControllers;
