import express from 'express';
//import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();
router.get('/', recipeControllers.getAllRecipes);
router.post('/add', recipeControllers.postRecipe);
router.get('/:id', recipeControllers.getOneRecipe);
router.put('/update/:id', recipeControllers.updateRecipe);
router.delete('/delete/:id', recipeControllers.deleteRecipe);

// routes

export default router;
