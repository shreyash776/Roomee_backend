import express from 'express';
import { createUserProfile } from '../controllers/profileController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Imported as 'authenticate'
import { validateProfile } from '../middlewares/profileValidation.js'; // Ensure this exists

const router = express.Router();

router.post('/profile', 
  authenticate,      // Changed from authMiddleware to authenticate
  validateProfile, 
  createUserProfile
);

export default router;
