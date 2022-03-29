const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      require: [true, 'Please provide an email address'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
