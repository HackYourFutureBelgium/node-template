import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();

// routes
router.get('/recipes', recipeControllers.getAllRecipes);
router.post('/recipes', recipeControllers.postRecipe);
router.get('/recipes/:id', recipeControllers.getOneRecipe);
router.put('/recipes/:id', recipeControllers.updateRecipe);
router.delete('/recipes/:id', recipeControllers.deleteRecipe);

export default router;
