import express from 'express';
import { createUserProfile } from '../controllers/profileController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Imported as 'authenticate'


const router = express.Router();

router.post('/profile', 
  authenticate,      // Changed from authMiddleware to authenticate
  
  createUserProfile
);

export default router;