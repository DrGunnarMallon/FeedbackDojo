const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const User = require('../models/userModel');
const Lecture = require('../models/lectureModel');

// @desc    Get all lectures for Course
// @route   GET /api/lectures/
// @access  Protected
const getLectures = asyncHandler(async (req, res) => {
  const lectures = await Lecture.find({ user: req.user.id, course: req.params.courseId });
  res.status(200).json(lectures);
});

// @desc    Register a new lecture
// @route   POST /api/lectures/
// @access  Protected
const setLecture = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a lecture title');
  }

  const course = await Lecture.create({
    title: req.body.title,
    course: req.body.courseId,
    user: req.user.id,
    order: req.body.order ? req.body.order : 0,
  });

  res.status(200).json(course);
});

// @desc    Update a specific lecture
// @route   PUT /api/lectures/:id
// @access  Protected
const updateLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  // Check if course exists
  if (!lecture) {
    res.status(400);
    throw new Error('Lecture not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that logged in user matches lecture user
  if (lecture.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedLecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedLecture);
});

// @desc    Delete specific user lecture
// @route   DELETE /api/lectures/:id
// @access  Protected
const deleteLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  // Check that course exists
  if (!lecture) {
    res.status(400);
    throw new Error('Lecture not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that logged in user matches course user
  if (lecture.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await lecture.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getLectures, setLecture, updateLecture, deleteLecture };
