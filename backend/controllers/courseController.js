const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const User = require('../models/userModel');

// @desc    Get all courses for user
// @route   GET /api/courses/
// @access  Protected
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ user: req.user.id });
  res.status(200).json(courses);
});

// @desc    Register a new user course
// @route   POST /api/courses/
// @access  Protected
const setCourse = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a course title');
  }

  const course = await Course.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(200).json(course);
});

// @desc    Update a specific user course
// @route   PUT /api/courses/:id
// @access  Protected
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  // Check if course exists
  if (!course) {
    res.status(400);
    throw new Error('Course not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that logged in user matches course user
  if (course.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedCourse);
});

// @desc    Delete specific use course
// @route   DELETE /api/courses/:id
// @access  Protected
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  // Check that course exists
  if (!course) {
    res.status(400);
    throw new Error('Course not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check that logged in user matches course user
  if (course.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await course.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getCourses, setCourse, updateCourse, deleteCourse };
