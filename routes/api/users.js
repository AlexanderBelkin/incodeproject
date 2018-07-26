const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();
// Load validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateProfileInput = require('../../validation/profile');

// Loda user model
const User = require('../../models/User');

const keys = require('../../config/keys');

// @route GET api/users/test
// @desc tests users route
// @access public
router.get('/test', (req, res) => {
  res.json({ message: 'Users works' });
});

// @route POST api/users/register
// @desc Register user
// @access public
router.post('/register', (req, res) => {
  // validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.text = 'Email already exists';
      return res.status(400).json(errors);
    }

    User.findOne({ login: req.body.login }).then(user => {
      if (user) {
        errors.text = 'Login already exists';
        return res.status(400).json(errors);
      }
      const newUser = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(resUser => {
              // create jwt payload
              const payload = {
                id: resUser.id,
                login: resUser.login,
                isAdmin: resUser.isAdmin,
              };

              // sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: `Bearer ${token}`,
                  });
                },
              );

              return null;
            })
            .catch(e => console.log(e));
        });
      });
    });
  });
});

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // chack validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const field = req.body.login.indexOf('@') > -1 ? 'email' : 'login';

  // Find user by login
  User.findOne({ [field]: req.body.login })
    .select('+password')
    .then(user => {
      // check for user
      if (!user) {
        errors.text = 'User not found';
        return res.status(404).json(errors);
      }

      // check password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched

          // create jwt payload
          const payload = {
            id: user.id,
            login: user.login,
            isAdmin: user.isAdmin,
          };

          // sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            },
          );

          return null;
        }

        errors.text = 'Password incorrect';
        return res.status(400).json(errors);
      });
      return null;
    });

  return null;
});

// @route GET api/users
// @desc Get all users
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(() => res.status(404).json({ text: 'No users found' }));
  },
);

// @route GET api/users/current
// @desc Get current user profile
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    User.findById(req.user._id)
      .then(user => {
        if (!user) {
          errors.text = 'There is no user found';
          return res.status(404).json(errors);
        }

        res.json(user);

        return null;
      })
      .catch(err => res.status(404).json(err));
  },
);

// @route PUT api/users/profile
// @desc Create or update user profile
// @access Private
router.put(
  '/profile',
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

    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.birthDate) profileFields.birthDate = req.body.birthDate;
    // skills - split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(', ');
    }

    User.findByIdAndUpdate(req.user.id, { $set: profileFields }, { new: true })
      .then(user => res.json(user))
      .catch(() => res.status(404).json({ text: 'User not found' }));
  },
);

module.exports = router;
