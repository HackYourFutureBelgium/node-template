import connection from '../config/db.js';


// controllers/recipeController.js

//import connection from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const [rows] = connection.query('SELECT * FROM recipes');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching recipes' });
        }
    },

    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await connection.query('SELECT * FROM recipes WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json(rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching recipe' });
        }
    },

    postRecipe: async (req, res) => {
        const { title, description } = req.body;
        const userId = req.userId;

        try {
            await connection.query(
                'INSERT INTO recipes (title, description, user_id) VALUES (?, ?, ?)',
                [title, description, userId]
            );
            res.status(201).json({ message: 'Recipe created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating recipe' });
        }
    },

    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.userId;

        try {
            const [result] = await connection.query(
                'UPDATE recipes SET title = ?, description = ? WHERE id = ? AND user_id = ?',
                [title, description, id, userId]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Recipe not found or unauthorized' });
            }
            res.status(200).json({ message: 'Recipe updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating recipe' });
        }
    },

    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        const userId = req.userId;

        try {
            const [result] = await connection.query('DELETE FROM recipes WHERE id = ? AND user_id = ?', [id, userId]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Recipe not found or unauthorized' });
            }
            res.status(200).json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting recipe' });
        }
    },
};

export default recipeControllers;
