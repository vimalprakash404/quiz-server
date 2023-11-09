const express = require('express');
const router = express.Router();
const Category = require('../model/categoryModel'); // Import the category model
const Quiz = require('../model/quizModel'); // Import the quiz model
const Question = require('../model/questionModel');

// Route to create a new category
router.post('/category/create', async (req, res) => {
  try {
    const { name, description } = req.body;
    con

    // Check if the category with the same name already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category with the same name already exists.' });
    }

    const category = new Category({
      name,
      description,
    });

    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Category creation failed.' });
  }
});

// Route to create a new quiz with questions and options
router.post('/create/quiz', async (req, res) => {
  try {
    const { name, categoryId, questions } = req.body;

    const quiz = new Quiz({
      name,
      category: categoryId, // Assuming you have the category ID
      questions: questions, // We'll populate this with questions
    });

   

    console.log(questions);


    const savedQuiz = await quiz.save();

    res.status(201).json(savedQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Quiz creation failed.' });
  }
});


module.exports = router;