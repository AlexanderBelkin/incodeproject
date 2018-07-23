const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create User Schema
const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
