import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  images: [{
    type: String,
    required: true
  }],
  address: {
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    }
  },
  amenities: [{
    type: String,
    required: true
  }],
  rent: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Ensure we don't recreate the model if it already exists
const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
export default Room;
