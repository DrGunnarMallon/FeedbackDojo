const asyncHandler = require('express-async-handler');
const Question = require('../models/questionModel');

// @desc    Get all questions for user.
// @route   GET /api/questions/
// @access  Protected
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({
    user: req.user.id,
    questionnaire: req.body.questionnaire,
  });
  res.status(200).json(questions);
});

// @desc    Get specific question
// @route   GET /api/questions/:id
// @access  Protected
const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.status(200).json(question);
});

// @desc    Register a new question
// @route   POST /api/questions/
// @access  Protected
const setQuestion = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400);
    throw new Error('Please add a question content');
  }

  const question = await Question.create({
    content: req.body.content,
    questionnaire: req.body.questionnaire,
    user: req.user.id,
    order: req.body.order ? req.body.order : 0,
  });

  res.status(200).json(question);
});

// @desc    Update a specific question
// @route   PUT /api/questions/:id
// @access  Protected
const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  // Check if course exists
  if (!question) {
    res.status(400);
    throw new Error('Question not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that logged in user matches lecture user
  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedQuestion);
});

// @desc    Delete specific  question
// @route   DELETE /api/questions/:id
// @access  Protected
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  // Check that course exists
  if (!question) {
    res.status(400);
    throw new Error('Question not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that logged in user matches course user
  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await question.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getQuestions,
  getQuestion,
  setQuestion,
  updateQuestion,
  deleteQuestion,
};
