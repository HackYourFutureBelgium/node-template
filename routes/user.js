import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();


// routes
router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/logout', userControllers.logout);

export default router;
