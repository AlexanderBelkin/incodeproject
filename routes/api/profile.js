const express = require('express');
const passport = require('passport');

// Load validation
const validateProfileInput = require('../../validation/profile');
// Load profile model
const Profile = require('../../models/Profile');

const router = express.Router();

// @route GET api/profile/test
// @desc tests profile route
// @access public
router.get('/test', (req, res) => {
  res.json({ message: 'Profile works' });
});

// @route GET api/profile
// @desc Get current users profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }

        res.json(profile);

        return null;
      })
      .catch(err => res.status(404).json(err));
  },
);

// @route POST api/profile
// @desc Create ot edit user profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
      // return any arrors with 400 status
      return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.birthDate) profileFields.birthDate = req.body.birthDate;
    // skills - split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(', ');
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        ).then(profile => res.json(profile));
      } else {
        // Create new profile

        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  },
);

module.exports = router;
