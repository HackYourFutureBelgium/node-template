import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await query('SELECT * FROM recipes');
            res.json(recipes);
        } catch (error) {
            res.status(500).send('Error retrieving recipes');
        }
    },
    
    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const recipes = await query('SELECT * FROM recipes WHERE id = ?', [id]);
            if (recipes.length === 0) {
                return res.status(404).send('Recipe not found');
            }
            res.json(recipes[0]);
        } catch (error) {
            res.status(500).send('Error retrieving the recipe');
        }
    },
    
    postRecipe: async (req, res) => {
        const { title, description } = req.body;
        try {
            await query('INSERT INTO recipes (title, description) VALUES (?, ?)', [title, description]);
            res.status(201).send('Recipe created successfully');
        } catch (error) {
            res.status(500).send('Error creating the recipe');
        }
    },
    
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const result = await query('UPDATE recipes SET title = ?, description = ? WHERE id = ?', [title, description, id]);
            if (result.affectedRows === 0) {
                return res.status(404).send('Recipe not found');
            }
            res.send('Recipe updated successfully');
        } catch (error) {
            res.status(500).send('Error updating the recipe');
        }
    },
    
    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await query('DELETE FROM recipes WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return res.status(404).send('Recipe not found');
            }
            res.send('Recipe deleted successfully');
        } catch (error) {
            res.status(500).send('Error deleting the recipe');
        }
    },
};

export default recipeControllers;

