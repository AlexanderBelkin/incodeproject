import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { CardContent, ListItem, List, Button } from '@material-ui/core';

import Input from '../form/Input';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const validateLogin = ({ login, password }) => {
  const errors = {};

  if (!login) {
    errors.login = 'Login is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};

const LoginForm = ({
  onAuthToggle,
  invalid,
  onFormSubmit,
  handleSubmit,
  authError,
}) => (
  <form onSubmit={handleSubmit(onFormSubmit)}>
    <CardContent>
      {authError && <ErrorMessage error={authError.text} />}
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
  validate: validateLogin,
})(LoginForm);
