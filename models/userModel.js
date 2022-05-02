const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A name is required'],
    },
  },
  {
    email: {
      type: String,
      required: [true, 'An email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    photo: String,
    password: {
      type: String,
      required: [true, 'A password is required'],
      minlength: 8,
    },
  },
  {
    passwordConfim: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
    },
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
