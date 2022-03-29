const express = require('express');
const router = express.Router();
const {
  getCourses,
  setCourse,
  deleteCourse,
  updateCourse,
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCourses).post(protect, setCourse);
router.route('/:id').put(protect, updateCourse).delete(protect, deleteCourse);

module.exports = router;
