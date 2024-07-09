import express from 'express';

import path, { dirname } from 'path';
const app = express();

import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const recipe = path.resolve(__dirname, './data.json');
import recipeData from './data.json' assert { type: 'json' };
const { recipes } = recipeData;

app.get('/', (req, res) => {
    res.json(recipes);
});

app.listen(5000, () => {
    console.log('server is running on port 5000....');
});
