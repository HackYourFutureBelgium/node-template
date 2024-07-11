import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();

// routes
router.post('/register', userControllers.registerUser);
router.post('/login', userControllers.loginUser);
router.post('/logout', userControllers.logoutUser);
export default router;
