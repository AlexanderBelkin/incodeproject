const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  const login = !isEmpty(data.login) ? data.login : '';
  const email = !isEmpty(data.email) ? data.email : '';
  const password = !isEmpty(data.password) ? data.password : '';
  const confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (!Validator.isLength(login, { min: 2, max: 30 })) {
    errors.text = 'Login must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(login)) {
    errors.text = 'Login field is required';
  }

  if (Validator.isEmpty(email)) {
    errors.text = 'Email field is required';
  }

  if (!Validator.isEmail(email)) {
    errors.text = 'Email is invalid';
  }

  if (Validator.isEmpty(password)) {
    errors.text = 'Password field is required';
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.text = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(confirmPassword)) {
    errors.text = 'Confirm Password field is required';
  }

  if (!Validator.equals(password, confirmPassword)) {
    errors.text = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
