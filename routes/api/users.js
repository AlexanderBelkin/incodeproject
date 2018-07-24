const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();
// Load validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

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

// @route GET api/users/login
// @desc Login user / Returning JWT token
// @access public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // chack validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by login
  User.findOne({ login: req.body.login }).then(user => {
    // check for user
    if (!user) {
      // Find user by email
      User.findOne({ email: req.body.login }).then(user => {
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

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      login: req.user.login,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  },
);

module.exports = router;
