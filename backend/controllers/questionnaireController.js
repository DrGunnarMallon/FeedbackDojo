const asyncHandler = require('express-async-handler');
const Questionnaire = require('../models/questionnaireModel');

// @desc    Get all questionnaire for user.
// @route   GET /api/questionnaires/
// @access  Protected
const getQuestionnaires = asyncHandler(async (req, res) => {
  const questionnaires = await Questionnaire.find({ user: req.user.id });
  res.status(200).json(questionnaires);
});

// @desc    Get specific questinnaire
// @route   GET /api/questionnaires/:id
// @access  Protected
const getQuestionnaire = asyncHandler(async (req, res) => {
  const questionnaire = await Questionnaire.findById(req.params.id);
  res.status(200).json(questionnaire);
});

// @desc    Register a new questionnaire
// @route   POST /api/questionnaires/
// @access  Protected
const setQuestionnaire = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a questionnaire title');
  }

  const questionnaire = await Questionnaire.create({
    title: req.body.title,
    course: req.body.courseId,
    lecture: req.body.lectureId,
    user: req.user.id,
    order: req.body.order ? req.body.order : 0,
    date: req.body.date,
  });

  res.status(200).json(questionnaire);
});

// @desc    Update a specific questionnaire
// @route   PUT /api/questionnairess/:id
// @access  Protected
const updateQuestionnaire = asyncHandler(async (req, res) => {
  const questionnaire = await Questionnaire.findById(req.params.id);

  // Check if course exists
  if (!questionnaire) {
    res.status(400);
    throw new Error('Questionnaire not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that logged in user matches lecture user
  if (questionnaire.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedQuestionnaire);
});

// @desc    Delete specific  questionnaire
// @route   DELETE /api/questionnaires/:id
// @access  Protected
const deleteQuestionnaire = asyncHandler(async (req, res) => {
  const questionnaire = await Questionnaire.findById(req.params.id);

  // Check that course exists
  if (!questionnaire) {
    res.status(400);
    throw new Error('Questionnaire not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that logged in user matches course user
  if (questionnaire.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await questionnaire.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getQuestionnaires,
  getQuestionnaire,
  setQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
};
