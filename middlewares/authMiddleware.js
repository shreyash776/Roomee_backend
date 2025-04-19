
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

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
          // hello its me

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Authentication failed' });
  }
};


// hello this is for the ci/cd pipeline testing
// hello this is for the ci/cd pipeline testing
 