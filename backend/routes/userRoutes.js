import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

// Route for user registration
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

// Route to get all users
router.get('/users', userController.getAllUsers);

// Route for fetching user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Route for updating user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Route for updating user password
router.put('/password', authMiddleware, userController.updateUserPassword);

export default router;
