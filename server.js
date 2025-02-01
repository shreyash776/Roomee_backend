const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
import authRoutes from './routes/authRoutes.js';
const cors = require('cors'); 
import profileRoutes from './routes/profileRoutes.js';


dotenv.config();

const app = express();


connectDB();


app.use(express.json());
app.use(cors()); 
 

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.use('/api', profileRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
