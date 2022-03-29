const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Course',
    },
    title: {
      type: String,
      require: [true, 'Please provide a course title'],
    },
    order: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lecture', lectureSchema);
