import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        res.render('home', {
            title: 'Recipe',
            path: '/recipes'
        });
    },
    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        res.render('recipe', {
            id: id,
            title: 'Book',
            path: '/recipes'
        });
    },
    postRecipe: async (req, res) => {},
    updateRecipe: async (req, res) => {},
    deleteRecipe: async (req, res) => {},
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