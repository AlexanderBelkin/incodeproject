import React from 'react';
import { connect } from 'react-redux';
import { Card, withStyles } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import RegisterForm from '../../components/AuthForms/RegisterForm';
import LoginForm from '../../components/AuthForms/LoginForm';

const style = {
  card: {
    maxWidth: '450px',
    margin: '0 auto',
    position: 'relative',
  },
  controls: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: '100',
  },
};

const Auth = ({ classes, authToggle, onAuthToggle }) => (
  <Card className={classes.card}>
    {authToggle ? (
      <LoginForm onAuthToggle={onAuthToggle} />
    ) : (
      <RegisterForm onAuthToggle={onAuthToggle} />
    )}
  </Card>
);

const mapStateToProps = state => ({
  authToggle: state.auth.authToggle,
});

const mapDispatchToProps = dispatch => ({
  onAuthToggle: () => dispatch(actions.authToggle()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(Auth));
