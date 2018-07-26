const express = require('express');
const passport = require('passport');

const router = express.Router();
// Load Task model
const Task = require('../../models/Task');

// validation
const validateTaskInput = require('../../validation/task');
const validateCommentInput = require('../../validation/comment');

// @route GET api/tasks/test
// @desc tests task route
// @access public
router.get('/test', (req, res) => {
  res.json({ message: 'Posts works' });
});

// @route GET api/tasks
// @desc Get tasks
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Task.find()
      .sort({ date: -1 })
      .then(tasks => res.json(tasks))
      .catch(() => res.status(404).json({ text: 'No tasks found' }));
  },
);

// @route GET api/tasks/:id
// @desc Get task by id
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        if (!task) {
          throw new Error('Task is null');
        }
        res.json(task);
      })
      .catch(() => res.status(404).json({ text: 'No task found' }));
  },
);

// @route GET api/tasks/user/:user_id
// @desc Get user tasks
// @access Private
router.get(
  '/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Task.find({ performerId: req.params.user_id })
      .sort({ date: -1 })
      .then(tasks => res.json(tasks))
      .catch(() => res.status(404).json({ text: 'No tasks found' }));
  },
);

// @route POST api/tasks
// @desc Create task
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    // check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      performerId: req.body.performerId,
    });

    newTask.save().then(task => res.json(task));
  },
);

// @route PUT api/tasks/:id
// @desc Update task
// @access Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(task => res.json(task))
      .catch(() => res.status(404).json({ text: 'Task not found' }));
  },
);

// @route POST api/tasks/comment/:id
// @desc Add a comment to task
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Task.findById(req.params.id)
      .then(task => {
        const newComment = {
          text: req.body.text,
          login: req.user.login,
          user: req.user.id,
        };

        // add to comment array
        task.comments.push(newComment);

        // save
        task.save().then(task => res.json(task));
      })
      .catch(() => res.status(404).json({ text: 'Task not found' }));
  },
);

// @route DELETE api/tasks/:id
// @desc Remove task
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check if user is admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ text: 'User not authorized' });
    }

    Task.findByIdAndRemove(req.params.id)
      .then(() => res.json({ success: true }))
      .catch(() => res.status(404).json({ text: 'Post not found' }));
  },
);

module.exports = router;
