
import express from 'express';
import { 
  createRoom, 
  getAllRooms, 
  getRoomById, 
  getUserRooms,
  updateRoom,
  deleteRoom,
  joinRoom, 
  leaveRoom 
} from '../controllers/roomController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoomById);


router.post('/rooms', authenticate, createRoom);
router.get('/user/rooms', authenticate, getUserRooms);
router.put('/rooms/:id', authenticate, updateRoom);
router.delete('/rooms/:id', authenticate, deleteRoom);


router.post('/rooms/:id/join', authenticate, joinRoom);
router.post('/rooms/:id/leave', authenticate, leaveRoom);

export default router;
