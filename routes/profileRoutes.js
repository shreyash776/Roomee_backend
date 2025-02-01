import express from 'express';
import { createUserProfile } from '../controllers/profileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/profile', authMiddleware, createUserProfile);

export default router;
