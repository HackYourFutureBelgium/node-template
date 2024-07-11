import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();

// Routes
router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/logout', userControllers.logout);

export default router;
