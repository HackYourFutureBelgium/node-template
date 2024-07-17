import express, { response } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const { getAllRecipes, getOneRecipe ,postRecipe, updateRecipe, deleteRecipe}=
      recipeControllers;
const router = express.Router();

// routes
router.get('/',getAllRecipes);
router.get('/:id', getOneRecipe);
router.post('/', verifyToken, postRecipe);
router.put('/:id',verifyToken,updateRecipe);
router.delete('/:id', verifyToken, deleteRecipe);



export default router;
