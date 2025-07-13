import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { sendEmail } from '../utils/mailer.js';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long with uppercase, lowercase, number, and special character',
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    try {
      await sendEmail({
        to: email,
        subject: 'Account Created Successfully 🎉',
        text: `Hello ${name},\n\nYour account has been successfully created.\n\nWelcome aboard!\n\n- Your App Team`,
        html: `<h1>Welcome, ${name}!</h1><p>Your account has been successfully created. 🎉</p><p>We are excited to have you onboard.</p><br/><b>Thank you!</b>`,
      });
      console.log('✅ Email sent successfully to', email);
    } catch (emailError) {
      console.error('❌ Email failed to send:', emailError);
    }
    
    console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✓ Loaded' : '✗ Not Found');


    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        
      }
    });

  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Server error during registration' 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, name: user.name }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Server error during login' 
    });
  }
};
