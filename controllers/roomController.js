
import Room from '../models/RoomModel.js';

export const createRoom = async (req, res) => {
  try {
    const { images, address, amenities, rent, description } = req.body;
    const owner = req.user.id; 

  
    if (!images || !address || !amenities || !rent || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newRoom = new Room({
      images,
      address,
      amenities,
      rent,
      description,
      owner
    });

    await newRoom.save();

    res.status(201).json({
      success: true,
      data: newRoom
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};


export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Get a specific room by ID
export const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.id;
    
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Get rooms owned by the authenticated user
export const getUserRooms = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const rooms = await Room.find({ owner: userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Update a room (only if the user is the owner)
export const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user.id;
    
    // Find the room
    let room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    // Check ownership
    if (room.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this room'
      });
    }
    
    // Update room
    room = await Room.findByIdAndUpdate(roomId, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Delete a room (only if the user is the owner)
export const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user.id;
    
    // Find the room
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    // Check ownership
    if (room.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this room'
      });
    }
    
    await Room.findByIdAndDelete(roomId);
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Join a room
export const joinRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user.id;
    
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    // Check if user is already a member
    if (room.members && room.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Already a member of this room'
      });
    }
    
    // Add user to members array
    room.members = room.members || [];
    room.members.push(userId);
    await room.save();
    
    res.status(200).json({
      success: true,
      message: 'Successfully joined room',
      data: room
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Leave a room
export const leaveRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user.id;
    
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    // Check if user is a member
    if (!room.members || !room.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Not a member of this room'
      });
    }
    
    // Remove user from members array
    room.members = room.members.filter(member => member.toString() !== userId);
    await room.save();
    
    res.status(200).json({
      success: true,
      message: 'Successfully left room',
      data: room
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
