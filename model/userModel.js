// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: isValidEmail,
      message: 'Invalid email format',
    },
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: isValidPhone,
      message: 'Invalid phone number format',
    },
  },
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
