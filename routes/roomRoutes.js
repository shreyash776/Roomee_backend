import express from 'express';
import { 
  createRoom, 
  getAllRooms, 
  getRoomById, 
  getUserRooms,
  updateRoom,
  deleteRoom,
  joinRoom, 
  leaveRoom,
  getRoomImage
} from '../controllers/roomController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { upload, handleUploadErrors } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoomById);
router.get('/rooms/:roomId/image/:imageId', getRoomImage);

// Authenticated routes
router.post('/rooms', 
  authenticate, 
  upload,
  handleUploadErrors,
  createRoom
);

router.get('/user/rooms', authenticate, getUserRooms);
router.put('/rooms/:id', authenticate, updateRoom);
router.delete('/rooms/:id', authenticate, deleteRoom);

// Room membership routes
router.post('/rooms/:id/join', authenticate, joinRoom);
router.post('/rooms/:id/leave', authenticate, leaveRoom);

export default router;
