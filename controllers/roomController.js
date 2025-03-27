import Room from '../models/RoomModel.js';

export const createRoom = async (req, res) => {
  try {
    const { address, amenities, rent, description } = req.body;
    const owner = req.user.id;

    // Validate required fields
    const errors = [];
    if (!req.files || req.files.length === 0) errors.push('At least one image is required');
    if (!address?.latitude || !address?.longitude) errors.push('Valid coordinates are required');
    if (!amenities?.length) errors.push('At least one amenity is required');
    if (!rent) errors.push('Rent amount is required');
    if (!description) errors.push('Description is required');
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors
      });
    }

    // Process images
    const images = req.files.map(file => ({
      buffer: file.buffer,
      mimeType: file.mimetype,
      metadata: {
        size: file.size
      }
    }));

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
      data: {
        ...newRoom.toObject(),
        images: newRoom.images.map(img => ({
          id: img._id,
          mimeType: img.mimeType,
          metadata: img.metadata
        }))
      }
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
    const rooms = await Room.find()
      .select('-images.buffer')
      .sort({ createdAt: -1 });
    
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

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .select('-images.buffer')
      .populate('owner members', 'name email');
    
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

export const getUserRooms = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const rooms = await Room.find({ owner: userId })
      .select('-images.buffer')
      .sort({ createdAt: -1 });
    
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

export const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user.id;
    
    let room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    if (room.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this room'
      });
    }
    
    // Handle image updates if needed
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        buffer: file.buffer,
        mimeType: file.mimetype,
        metadata: {
          size: file.size
        }
      }));
      room.images = [...room.images, ...newImages];
    }

    // Update other fields
    const { address, amenities, rent, description } = req.body;
    if (address) room.address = address;
    if (amenities) room.amenities = amenities;
    if (rent) room.rent = rent;
    if (description) room.description = description;

    await room.save();
    
    res.status(200).json({
      success: true,
      data: {
        ...room.toObject(),
        images: room.images.map(img => ({
          id: img._id,
          mimeType: img.mimeType,
          metadata: img.metadata
        }))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

export const deleteRoom = async (req, res) => {
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
    
    if (room.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this room'
      });
    }
    
    await Room.findByIdAndDelete(roomId);
    
    res.status(200).json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

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
    
    if (room.members && room.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Already a member of this room'
      });
    }
    
    room.members = room.members || [];
    room.members.push(userId);
    await room.save();
    
    res.status(200).json({
      success: true,
      message: 'Successfully joined room',
      data: {
        ...room.toObject(),
        images: room.images.map(img => ({
          id: img._id,
          mimeType: img.mimeType,
          metadata: img.metadata
        }))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

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
    
    if (!room.members || !room.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Not a member of this room'
      });
    }
    
    room.members = room.members.filter(member => member.toString() !== userId);
    await room.save();
    
    res.status(200).json({
      success: true,
      message: 'Successfully left room',
      data: {
        ...room.toObject(),
        images: room.images.map(img => ({
          id: img._id,
          mimeType: img.mimeType,
          metadata: img.metadata
        }))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

export const getRoomImage = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }

    const image = room.images.id(req.params.imageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }

    res.set('Content-Type', image.mimeType);
    res.send(image.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
