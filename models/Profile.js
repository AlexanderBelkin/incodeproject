const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Profile Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
