import { Router } from 'express';
import authRoutes from './authRoutes.js';

const router = Router();

// Mount auth routes at /api/auth
router.use('/auth', authRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

export default router; 