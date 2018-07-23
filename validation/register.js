const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  const name = !isEmpty(data.name) ? data.name : '';
  const email = !isEmpty(data.email) ? data.email : '';
  const password = !isEmpty(data.password) ? data.password : '';
  const confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Confirm Password field is required';
  }

  if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
