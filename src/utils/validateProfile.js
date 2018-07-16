import isEmail from 'isemail';

const birthMask = /\d{2}-\d{2}-\d{4}/;

export const validateProfile = ({ name, email, birthDate }) => {
  const errors = {};

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!isEmail.validate(email)) {
    errors.email = 'Please, write your email properly.';
  }

  if (!birthDate) {
    errors.birthDate = 'Please, provide your date of birth';
  } else if (!birthMask.test(birthDate)) {
    errors.birthDate = 'Please, write your date of birth properly';
  }

  return errors;
};
