const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestion,
  setQuestion,
  deleteQuestion,
  updateQuestion,
} = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getQuestions).post(protect, setQuestion);
router
  .route('/:id')
  .get(protect, getQuestion)
  .put(protect, updateQuestion)
  .delete(protect, deleteQuestion);

module.exports = router;
