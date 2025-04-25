import Profile from '../models/ProfileModel.js';
import User from '../models/userModel.js';

export const createUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { firstName, lastName, gender, dateOfBirth, workTitle, schoolName, lifestyleTags } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Create or update profile
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        firstName,
        lastName,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        workTitle,
        schoolName,
        lifestyleTags
      },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      data: profile
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};