const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup routes
router.post('/signup', authController.signup);
router.post('/signup/verify', authController.verifySignupOtp);

// Login routes
router.post('/login', authController.login);
router.post('/login/verify', authController.verifyLoginOtp);

module.exports = router;
