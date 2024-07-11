import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.getAllRecipes();
            res.render('home', {
                title: 'Recipes',
                path: '/',
                recipes: recipes
            });
        } catch (err) {
            console.error('Error getting recipes:', err);
            res.status(500).send('Error getting recipes');
        }
    },
    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const recipe = await Recipe.getRecipeById(id);
            if (!recipe) {
                return res.status(404).send('Recipe not found');
            }
            res.render('recipe', {
                id: id,
                title: 'Recipe',
                path: '/recipe',
                recipe: recipe
            });
        } catch (err) {
            console.error(`Error getting recipe with ID ${id}:`, err);
            res.status(500).send('Error getting recipe');
        }
    },
    postRecipe: async (req, res) => {},
    updateRecipe: async (req, res) => { const { id } = req.params;
    const { updatedTitle } = req.body;
    try {
        const recipe = await Recipe.updateRecipe(id, updatedTitle);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipe', {
            id: id,
            updatedTitle: updatedTitle,
            title: 'Recipe',
            path: '/recipe',
            recipe: recipe
        });
    } catch (err) {
        console.error(`Error updating recipe with ID ${id}:`, err);
        res.status(500).send('Error updating recipe');
    }

    },
    deleteRecipe: async (req, res) => {},
};

export default recipeControllers;
