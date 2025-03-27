// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/cloudinary'); 


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'profile_images', 
//     allowed_formats: ['jpeg', 'png', 'jpg'],
//     transformation: [
//       { width: 500, height: 500, crop: 'limit' }, 
//     ],
//   },
// });


// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, 
//   },
// }).single('profileImage'); 


// const handleError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
    
//     return res.status(400).json({ error: err.message });
//   } else if (err) {
   
//     return res.status(500).json({ error: 'Server error' });
//   }
//   next();
// };

// module.exports = { upload, handleError };

import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory as buffers

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 images per room
  }
}).array('images', 5); // 'images' is the field name

const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
  next();
};

export { upload, handleUploadErrors };
