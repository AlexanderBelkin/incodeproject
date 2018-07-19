import React from 'react';
import { reduxForm, Field } from 'redux-form';
import isEmail from 'isemail';
import { CardContent, ListItem, List, Button } from '@material-ui/core';

import Input from '../form/Input';

const validateRegister = ({ login, email }) => {
  const errors = {};

  if (!login) {
    errors.login = 'Login is required';
  } else if (login.length < 6) {
    errors.login = 'Login must contain at least 6 characters';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!isEmail.validate(email)) {
    errors.email = 'Please, write your email properly.';
  }

  return errors;
};

const RegisterForm = () => (
  <form>
    <CardContent>
      <List>
        <ListItem>
          <Field name="login" component={Input} label="Login" />
        </ListItem>
        <ListItem>
          <Field name="email" component={Input} label="Email" />
        </ListItem>
        <ListItem>
          <Field
            name="password"
            type="password"
            component={Input}
            label="Password"
          />
        </ListItem>
        <ListItem>
          <Field
            name="confirmPassword"
            type="password"
            component={Input}
            label="Confirm password"
          />
        </ListItem>
      </List>
      <div style={{ textAlign: 'center' }}>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
        <div style={{ margin: '20px', color: 'rgba(0, 0, 0, 0.6)' }}>
          Already has account?
        </div>
        <Button color="default">Switch to login</Button>
      </div>
    </CardContent>
  </form>
);

export default reduxForm({
  form: 'registerForm',
  enableReinitialize: true,
  validate: validateRegister,
})(RegisterForm);
