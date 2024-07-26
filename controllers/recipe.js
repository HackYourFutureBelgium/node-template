import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const { output } = await query('SELECT * FROM recipes');
            res.status(200).json(output);
        } catch (error) {
            res.status(500).json({error: 'Failed to retrieve recipes'});
        }
    },
    getOneRecipe: async (req, res) => {},
    postRecipe: async (req, res) => {
        const { name, description } = req.body;
        const newRecipe = await query(
            'INSERT INTO recipes (name, description) VALUES (?, ?)',
            [name, description]
        );
        res.json({ id: newRecipe.insertId, name, description });
    },
    updateRecipe: async (req, res) => {},
    deleteRecipe: async (req, res) => {
        try {
            const [result] = await query('DELETE FROM recipes WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                const error = new Error(`A recipe with the id of ${id} was not found`);
                error.status = 404;
                return next(error);
            }

    },
};

export default recipeControllers;
