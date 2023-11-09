// questionModel.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: [optionSchema], // Array of options
});

module.exports = mongoose.model('Question', questionSchema);
