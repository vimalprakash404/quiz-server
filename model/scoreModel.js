// scoreModel.js
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz', // Assuming you have a Quiz model
    required: true,
  },
  answers: Array,
  score: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // Duration in seconds, for example
    required: true,
  },
  submissionDateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Score', scoreSchema);
