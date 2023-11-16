// routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const authenticateToken = require('./authMiddleware');
const jwt  = require("jsonwebtoken")

const router = express.Router();
const secretKey = "key"; 

// Register endpoint
router.post('/register', async (req, res) => {
  

  // Validate email and phone
  // if (!isValidEmail(email) || !isValidPhone(phone)) {
  //   return res.status(400).send('Invalid email or phone number format');
  // }
  const { username, email, phone, password } = req.body;
  try {

    
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if the email or phone is already registered
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phone });

    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    if (existingUserByPhone) {
      return res.status(400).json({ message: 'Phone number is already registered.' });
    }

    // Create a new user
    const newUser = new User({ username, email, phone, password : hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database using email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send('Invalid email or password');
      return;
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Create and sign a JWT token
      const token = jwt.sign({ email: user.email }, secretKey);
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.log( error.response.data);
    console.error('Error in login:', error);
    res.status(500).send('Error in login');
  }
});

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  res.send(`Welcome, ${req.user.username}! This is a protected route.`);
});

// Validation functions
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

module.exports = router;
