import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();

// User routes
router.post('/api/register', userControllers.register);
router.post('/api/login', userControllers.login);
router.post('/api/logout', userControllers.logout);

export default router;
