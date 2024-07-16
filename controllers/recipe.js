import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
            try {
            const getAllRecipeQuery = 'SELECT * FROM recipe';
            const allRecipes = await query(getAllRecipeQuery);

            if(allRecipes.length > 0 ){
                return res.status(200).json({ok: true, recipes: allRecipes })
            }else{
                return res.status(404).json({ok: false, recipes: 'No recipes found' })
            }
            
        } catch (error) {
            return res.status(500).json({ok:false, message: error.message})
        }
    },
    getOneRecipe: async (req, res) => {
        
        try {
            const {id} = req.params ;
            const getOneRecipeQuery = 'SELECT * FROM recipe WHERE id = ?';
            const oneRecipe = await query(getOneRecipeQuery, id);

            if(oneRecipe.length > 0 ){
                return res.status(200).json({ok: true, recipe: oneRecipe })
            }else{
                return res.status(404).json({ok: false, recipes: `No recipes found with id: ${id}` })
            }     
        } catch (error) {
            return res.status(500).json({ok:false, message: error.message})
        }
    },
    postRecipe: async (req, res) => {
        try {
            const {name, cook, ingredients, description, img} = req.body;
            const addRecipe = await query('insert into recipe (name, cook, ingredients, description, img)values (?, ?, ?, ?, ?) ', [name, cook, ingredients , description, img])
            if(!name ||!cook ||!ingredients ||!description ||!img){
                return res.status(400).json({ok: false, message: `please fill all the field` })
            }else{
                return res.status(200).json({ok: true, recipe: req.body })
            }
        } catch (error) {
            return res.status(500).json({ok:false, message: error.message})
        }

    },
    updateRecipe: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, cook, ingredients, description, img } = req.body;

            const updateRecipe = await query('UPDATE recipe SET name = ?, cook = ?, ingredients = ?, description = ?, img = ? WHERE id = ?',[name, cook, ingredients, description, img])
            if(!name ||!cook ||!ingredients ||!description ||!img){
                return res.status(404).json({ok: false, message: `please fill all the field` })
            }else{
                return res.status(200).json({ok: true, recipe: req.body })
            }
        } catch (error) {
            return res.status(500).json({ok:false, message: error.message})
        }
    },
    deleteRecipe: async (req, res) => {
        try {
            const {id} = req.params ;
            const deleteRecipe = await query('delete  FROM recipe WHERE ID = ?', id )
            if(!deleteRecipe){
                return res.status(404).json({ok: false, message: `This id does not exist` })
            }else{
                return res.status(200).json({ok: true,  message: `This id has  deleted successfully` })
            }
        } catch (error) {
            return res.status(500).json({ok:false, message: error.message})
        
        }
    },
};

export default recipeControllers;
