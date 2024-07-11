import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();

// Routes
router.get('/recipes', recipeControllers.getAllRecipes);
router.get('/recipes/:id', recipeControllers.getOneRecipe);
router.post('/recipes', verifyToken, recipeControllers.postRecipe);
router.put('/recipes/:id', verifyToken, recipeControllers.updateRecipe);
router.delete('/recipes/:id', verifyToken, recipeControllers.deleteRecipe);

export default router;
