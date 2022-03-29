const express = require('express');
const router = express.Router();
const {
  getLectures,
  setLecture,
  deleteLecture,
  updateLecture,
} = require('../controllers/lectureController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getLectures).post(protect, setLecture);
router.route('/:id').put(protect, updateLecture).delete(protect, deleteLecture);

module.exports = router;
