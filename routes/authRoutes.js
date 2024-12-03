const express = require('express');
const { signup, login } = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();


router.post('/signup', upload.single('profileImage'), signup);


router.post('/login', login);

module.exports = router;