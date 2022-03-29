const express = require('express');
const router = express.Router();
const {
  getQuestionnaires,
  getQuestionnaire,
  setQuestionnaire,
  deleteQuestionnaire,
  updateQuestionnaire,
} = require('../controllers/questionnaireController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getQuestionnaires).post(protect, setQuestionnaire);
router
  .route('/:id')
  .get(protect, getQuestionnaire)
  .put(protect, updateQuestionnaire)
  .delete(protect, deleteQuestionnaire);

module.exports = router;
