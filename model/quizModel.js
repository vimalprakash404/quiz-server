// quizModel.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Assuming you have a Category model
  },
  questions:
    {
      type: Array
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
