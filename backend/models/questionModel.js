const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    questionnaire: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Questionnaire',
    },
    content: {
      type: String,
      require: [true, 'Please provide question content'],
    },
    order: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', questionSchema);
