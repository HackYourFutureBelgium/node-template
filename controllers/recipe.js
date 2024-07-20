import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const [recipes] = await query('SELECT * FROM recipes');
            res.status(200).json(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    },

    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const [recipe] = await query('SELECT * FROM recipes WHERE id = ?', [
                id
            ]);
            if (recipe.length === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json(recipe[0]);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    },

    postRecipe: async (req, res) => {
        const { title, totalYield, ingredients, instructions, user_id } =
            req.body;
        if (!title || !ingredients || !instructions || !user_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        try {
            const result = await query(
                'INSERT INTO recipes (title, totalYield, ingredients, instructions, user_id) VALUES (?, ?, ?, ?, ?)',
                [title, totalYield, ingredients, instructions, user_id]
            );
            const newRecipe = {
                id: result.insertId,
                title,
                totalYield,
                ingredients,
                instructions,
                user_id
            };
            res.status(201).json(newRecipe);
        } catch (error) {
            console.error('Error creating recipe:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    },

    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, totalYield, ingredients, instructions } = req.body;
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        try {
            const result = await query(
                'UPDATE recipes SET title = ?, totalYield = ?, ingredients = ?, instructions = ? WHERE id = ?',
                [title, totalYield, ingredients, instructions, id]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json({ message: 'Recipe updated successfully' });
        } catch (error) {
            console.error('Error updating recipe:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    },

    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await query('DELETE FROM recipes WHERE id = ?', [
                id
            ]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            console.error('Error deleting recipe:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    }
};

export default recipeControllers;
