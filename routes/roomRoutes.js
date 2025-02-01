import express from 'express';
import { createRoom } from '../controllers/roomController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected route - requires valid JWT
router.post('/rooms', authenticate, createRoom);

export default router;
