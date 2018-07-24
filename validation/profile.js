const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateProfileInput(data) {
  const errors = {};

  const name = !isEmpty(data.name) ? data.name : '';
  const email = !isEmpty(data.email) ? data.email : '';
  const birthDate = !isEmpty(data.birthDate) ? data.birthDate : '';
  const skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.text = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(name)) {
    errors.text = 'Name field is required';
  }

  if (Validator.isEmpty(email)) {
    errors.text = 'Email field is required';
  }

  if (!Validator.isEmail(email)) {
    errors.text = 'Email is invalid';
  }

  if (Validator.isEmpty(birthDate)) {
    errors.text = 'Date of birth field is required';
  }

  if (Validator.isEmpty(skills)) {
    errors.text = 'Skills field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
