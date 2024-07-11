import query from '../config/db.js';
import { createRecipe, deleteRecipe, getRecipeById, listRecipes, updateRecipe } from '../models/recipe.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        res.render('home', {
            title: 'Recipe',
            path: '/recipes',
            recipes: listRecipes()
        });
    },
    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        res.render('recipe', {
            id: id,
            title: 'Recipe',
            path: '/recipes',
            recipe: getRecipeById()
        });
    },
    postRecipe: async (req, res) => {
        createRecipe() // how to get title and user_id from user?
        res.render('home', {
            title: 'Recipe',
            path: '/recipes',
            recipes: listRecipes()
        });
    },
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        res.render('recipe', {
            id: id,
            title: 'Recipe',
            path: '/recipes/update',
            recipe: updateRecipe()
        });
    },
    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        res.render('recipe', {
            id: id,
            title: 'Recipe',
            path: '/recipes/delete',
            recipe: deleteRecipe()
        });
    },
};

export default recipeControllers;

/*
const homeControllers = {
    getBooks: (req, res) => {
        res.render('home', {
            title: 'Book',
            path: '/',
            books: Book.getBooks()
        });
    },
    getBook: (req, res) => {
        const { id } = req.params;
        res.render('book', {
            id: id,
            title: 'Book',
            path: '/book',
            book: Book.getBookById(id)
        });
    },
    addBook: (req, res) => {
        const book = new Book(req.body.title);
        book.addBook()
        res.render('home', {
            title: 'Book',
            path: '/',
            books: Book.getBooks()
        });
    }
};
*/