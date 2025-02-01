import Room from '../models/RoomModel.js';

export const createRoom = async (req, res) => {
  try {
    const { images, address, amenities, rent, description } = req.body;
    const owner = req.user.id; // From auth middleware

    // Basic validation
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
