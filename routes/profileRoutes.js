
import express from 'express';
import { createUserProfile, getUserProfile, updateUserProfile } from '../controllers/profileController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);


router.post('/profile', createUserProfile);


router.get('/profile', getUserProfile);


router.put('/profile/update', updateUserProfile);

export default router;
