const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/database');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();


app.use(express.json());


app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
