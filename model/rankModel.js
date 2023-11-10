// rankModel.js
const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
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
  score: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Rank', rankSchema);
