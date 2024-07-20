import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();

// Public routes
router.get('/api/recipes', recipeControllers.getAllRecipes);
router.get('/api/recipes/:id', recipeControllers.getOneRecipe);
router.post('/api/recipes', recipeControllers.postRecipe);
router.put('/api/recipes/:id', recipeControllers.updateRecipe);
router.delete('/api/recipes/:id',  recipeControllers.deleteRecipe);


// Protected routes
// router.post('/api/recipes', verifyToken,recipeControllers.postRecipe);
// router.put('/api/recipes/:id', verifyToken, recipeControllers.updateRecipe);
// router.delete('/api/recipes/:id', verifyToken, recipeControllers.deleteRecipe);

// Create a new recipe (authenticated users only)
router.post('/recipes', verifyToken, recipeControllers.postRecipe);

// Update a recipe by ID (authenticated users only)
router.put('/recipes/:id', verifyToken, recipeControllers.updateRecipe);

// Delete a recipe by ID (authenticated users only)
router.delete('/recipes/:id', verifyToken, recipeControllers.deleteRecipe);


export default router;

