// models/UserModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Check if model exists before creating it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

//uwvstvsqhsbqqjnqzubj wkzujbs2
//