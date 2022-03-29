const mongoose = require('mongoose');

const questionnaireSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      default: 0,
    },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
      default: 0,
    },
    title: {
      type: String,
      require: [true, 'Please provide a course title'],
    },
    order: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
