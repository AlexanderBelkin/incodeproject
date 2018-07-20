import React from 'react';
import { reduxForm, Field } from 'redux-form';
import isEmail from 'isemail';
import { CardContent, ListItem, List, Button } from '@material-ui/core';

import Input from '../form/Input';

const validateLogin = ({ login, password }) => {
  const errors = {};

  if (!login) {
    errors.login = 'Login is required';
  } else if (login.length < 6) {
    errors.login = 'Login must contain at least 6 characters';
  } else if (login.includes('@')) {
    if (!isEmail.validate(login)) {
      errors.login = 'Please, write your email properly.';
    }
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};

const LoginForm = ({ onAuthToggle, invalid }) => (
  <form>
    <CardContent>
      <List>
        <ListItem>
          <Field name="login" component={Input} label="Login" />
        </ListItem>
        <ListItem>
          <Field
            name="password"
            type="password"
            component={Input}
            label="Password"
          />
        </ListItem>
      </List>
      <div style={{ textAlign: 'center' }}>
        <Button
          disabled={invalid}
          type="submit"
          variant="contained"
          color="primary">
          Log In
        </Button>
        <div style={{ margin: '20px', color: 'rgba(0, 0, 0, 0.6)' }}>
          Create new account?
        </div>
        <Button onClick={onAuthToggle} color="default">
          Switch to Register
        </Button>
      </div>
    </CardContent>
  </form>
);

export default reduxForm({
  form: 'loginForm',
  enableReinitialize: true,
  validate: validateLogin,
})(LoginForm);
