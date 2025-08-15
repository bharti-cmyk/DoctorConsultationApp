import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

// POST /api/auth/register - User registration
router.post('/register', authController.register.bind(authController));

// POST /api/auth/login - User login
router.post('/login', authController.login.bind(authController));

// POST /api/auth/logout - User logout
router.post('/logout', authController.logout.bind(authController));

// GET /api/auth/profile - Get current user profile
router.get('/profile', authController.getProfile.bind(authController));

// POST /api/auth/refresh - Refresh JWT token
router.post('/refresh', authController.refreshToken.bind(authController));

export default router; 