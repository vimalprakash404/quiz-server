// quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../model/quizModel');
const Score = require("../model/scoreModel")

// Route to get all quizzes
router.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('category').populate('questions.question');
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve quizzes' });
  }
});

router.post('/submit', async (req, res) => {
    try {
      const { userId, quizId, answers, score, duration } = req.body;
  
      // Check if the user has already submitted a score for this quiz
      const existingScore = await Score.findOne({ userId, quizId });
  
      if (existingScore) {
        return res.status(400).json({ message: 'User has already submitted a score for this quiz' });
      }
  
      const newScore = new Score({
        userId,
        quizId,
        answers,
        score,
        duration,
      });
  
      await newScore.save();
  
      res.status(201).json({ message: 'Score submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to submit score' });
    }
  });

  router.get('/check-attendance', async (req, res) => {
    try {
      const { userId, quizId } = req.body;
      // Check if the user has submitted a score for the specified quiz
      const existingScore = await Score.findOne({ userId, quizId });
        console.log(existingScore)
      if (existingScore) {
        res.status(200).json({ attended: true });
      } else {
        res.status(200).json({ attended: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to check attendance' });
    }
  });
module.exports = router;
