const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data) {
  const errors = {};

  const login = !isEmpty(data.login) ? data.login : '';
  const password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(login)) {
    errors.text = 'Login field is required';
  }

  if (Validator.isEmpty(password)) {
    errors.text = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
