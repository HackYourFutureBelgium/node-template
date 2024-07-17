
import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try{
            const getAllRecipesQuery=`SELECT *FROM recipe`;
            const allRecipes = await query(getAllRecipesQuery);

            if (allRecipes.length>0){
                return res
                .status(200)
                .json({success:true, recipes:allRecipes });
            }else{
                return res 
                .status(404)
                .json({ success: false, message: `No recipes found` })
            }
        } catch(error){
            return res
            .status(500)
            .json({ success: false, error: error.message});
            
        }
    },


    getOneRecipe: async (req, res) => {
        const {id } =req.params;
        try{
            
            const getOneRecipe= `SELECT * FROM recipes WHERE id=?`;
            const oneRecipe = await query( getOneRecipeQuery, id);
            if (oneRecipe.length >0) {
                return res.status(200).json({ success: true, recipe: oneRecipe});
            }else{
            return res
            .status(400)
            .json({success:false, 
                message: ` NO recipe with id:${id} found` 
            });
        
        }
        } catch (error){
            return res.status(500).json({ success: false, error: error});
        }
    },
        
    
    postRecipe: async (req, res) => {

const { name, description } = req.body;
      try{
       
        if ( !name || !description){
            return res
            .status(400)
            .json({success: false, message: `all felids require...`});
    }
      
        } catch (error){
            return res.status(500).json({ success: false, error: error});

        }
      },
      
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const updateRecipeQuery = `UPDATE recipes SET name=?, description=? WHERE id=?`;
            const updateRecipe = await query(updateRecipeQuery,[name,description,id]);
            if(updateRecipe.affectedRows > 0){
                return res
                .status(200)
                .json({ success: true, recipe: req.body});
            }else{
                return res
                .status(404)
                .json({ success: false, message:`please fille all the field`});
            }
        } catch ( error) {
            return res
            .status(500)
            .json({ success: false, message: error.message});
        }
    },

    deleteRecipe: async (req, res) => {

        const { id } = req.params;
        const deleteRecipe = await query(`delete FROM recipe WHERE id =?`,id);
        try {
        if (!deleteRecipe){
            return res 
            .status(200)
            .json({ success: true, message: `this id does not exist`});
        }else{
            return res
            .status(404)
            .json({ success: false, message: `This id does not exit` });
        }
    }catch (error){
        return res
        .status(500)
        .json({ success: false, message: error.message});
    }
}
};


export default recipeControllers;
