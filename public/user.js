const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const Quiz= require("./quiz")
// Route to register a new user
router.use("/quiz", Quiz)
router.post('/register', async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const user = new User({
      name,
      email,
      phoneNumber,
      password,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User registration failed' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await user.comparePassword(password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Password is valid, user is authenticated
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});
module.exports = router;
