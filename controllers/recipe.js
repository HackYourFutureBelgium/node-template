import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const results = await query('SELECT * FROM recipes');
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const results = await query('SELECT * FROM recipes WHERE id = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            res.json(results[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    postRecipe: async (req, res) => {
        const { title, ingredients, instructions } = req.body;
        try {
            const results = await query(
                'INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)',
                [title, ingredients, instructions]
            );
            res.status(201).json({ message: 'Recipe created', recipeId: results.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, ingredients, instructions } = req.body;
        try {
            const results = await query(
                'UPDATE recipes SET title = ?, ingredients = ?, instructions = ? WHERE id = ?',
                [title, ingredients, instructions, id]
            );
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            res.json({ message: 'Recipe updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const results = await query('DELETE FROM recipes WHERE id = ?', [id]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            res.json({ message: 'Recipe deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

export default recipeControllers;
