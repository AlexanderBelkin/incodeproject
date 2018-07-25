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
    select: false,
  },
  registerDate: {
    type: Date,
    default: Date.now,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  skills: {
    type: [String],
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
