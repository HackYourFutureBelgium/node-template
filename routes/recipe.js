import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();
router.get('/', verifyToken, recipeControllers.getAllRecipes);

// routes

export default router;
