
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Use named exports
export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });

          }
         

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Authentication failed' });
  }
};


