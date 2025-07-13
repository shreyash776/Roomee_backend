import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js'; 
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import roomRoutes from './routes/roomRoutes.js';

dotenv.config(); 

const app = express();


connectDB();

// Middleware
app.use(express.json()); 
app.use(cors()); 
app.use(express.urlencoded({ extended: true })); 

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);  
app.use('/api/rooms', roomRoutes);      

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});


app.get('/demo', (req, res) => {
  res.send('Welcome to the demo route!');
});

// console.log('ALL ENV:', process.env);
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

