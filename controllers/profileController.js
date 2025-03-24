
import Profile from '../models/ProfileModel.js';
import User from '../models/UserModel.js';

export const createUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { firstName, lastName, gender, dateOfBirth, workTitle, schoolName, lifestyleTags } = req.body;

    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

   
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


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const profile = await Profile.findOne({ user: userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    res.status(200).json({
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

// Update the authenticated user's profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, gender, dateOfBirth, workTitle, schoolName, lifestyleTags } = req.body;
    
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        firstName,
        lastName,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        workTitle,
        schoolName,
        lifestyleTags
      },
      { new: true }
    );
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    res.status(200).json({
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
