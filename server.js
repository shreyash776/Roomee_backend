import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js'; 
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import roomRoutes from './routes/roomRoutes.js';

dotenv.config(); 

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors()); 
app.use(express.urlencoded({ extended: true })); 

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);  // Changed to /api/profile for clarity
app.use('/api/rooms', roomRoutes);       // Changed to /api/rooms for clarity

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
