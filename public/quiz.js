// quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../model/quizModel');
const Score = require("../model/scoreModel")
const auth = require ("./authMiddleware");
const scoreUtils = require('./scoreUtils');
// Route to get all quizzes
router.get('/all',async (req, res) => {
  // console.log(req.user._id);
  try {
    const quizzes = await Quiz.find().populate('category').populate('questions.question');
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve quizzes' });
  }
});

router.post('/submit', auth,async (req, res) => {
    try {
      const {  quizId, answers, score, duration } = req.body;
      const userId =  req.user._id;
      // Check if the user has already submitted a score for this quiz
      const existingScore = await Score.findOne({ userId, quizId });
  
      if (existingScore) {
        return res.status(401).json({ message: 'User has already submitted a score for this quiz' });
      }
      
      const newScore = new Score({
        userId,
        quizId,
        answers,
        score,
        duration,
      });
  
      await newScore.save();
      
      res.status(200).json({ message: 'Score submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to submit score' });
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




// Route to get the rank of a specific user for a given quiz
router.post('/rank', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { quizId } = req.body;

    if (!quizId || !userId) {
      return res.status(400).json({ message: 'Quiz ID and User ID are required in the request body' });
    }

    const userRank = await scoreUtils.calculateRanks(quizId, userId);

    if (userRank !== null) {
      res.status(200).json({ userRank });
    } else {
      res.status(404).json({ message: 'User or quiz not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/rankList/', async (req, res) => {
  try {
    const { quizId } = req.body;

    // Fetch all scores for the given quiz, ordered by rank
    const rankList = await Score.find({ quizId }).sort({ rank: 1 }).populate('userId', 'name');

    if (rankList.length > 0) {
      res.status(200).json({ rankList });
    } else {
      res.status(404).json({ message: 'No scores found for the specified quiz' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }});
module.exports = router;
