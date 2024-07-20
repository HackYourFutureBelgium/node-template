import express from 'express';
import cookieParser from 'cookie-parser';


import { fileURLToPath } from 'url';

import createUserTable from './models/user.js';
import createRecipeTable from './models/recipe.js';

// import routes
import userRoutes from './routes/user.js';
import recipeRoutes from './routes/recipe.js';
// import dotenv from './env';

import path  from 'path';
// // Load environment variables from .env file
// dotenv.config();

// set port
const PORT = process.env.PORT || 5009;



// Construct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const PATH = dirname(__filename);

// initialize express
const app = express();

// parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// // Middleware to serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Serve static files
// app.use(express.static(path.join(PATH, 'public')));
//OST
// Route to serve login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Route to serve register.html
// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'register.html'));
// });



// create tables
createUserTable();
createRecipeTable();

// use routes
app.use(userRoutes);
app.use(recipeRoutes);

// app.get('/', (req,res) => {

//     res.sendFile(path.join(PATH,'controllers','index.html'));

// });


// error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page is not found' });
});

// listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Server is running...');
// });
