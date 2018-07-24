import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CircularProgress, withStyles } from '@material-ui/core';

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

class Auth extends Component {
  handleSubmit = authData => {
    const { onAuth } = this.props;
    onAuth(authData, !authData.email);
  };

  render() {
    const {
      classes,
      authToggle,
      onAuthToggle,
      authLoading,
      authError,
    } = this.props;

    if (authLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return authToggle ? (
      <Card className={classes.card}>
        <LoginForm
          authError={authError}
          onFormSubmit={this.handleSubmit}
          onAuthToggle={onAuthToggle}
        />
      </Card>
    ) : (
      <Card className={classes.card}>
        <RegisterForm
          authError={authError}
          onFormSubmit={this.handleSubmit}
          onAuthToggle={onAuthToggle}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  authLoading: state.auth.loading,
  authError: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  authToggle: state.auth.authToggle,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (authData, isRegister) =>
    dispatch(actions.auth(authData, isRegister)),
  onAuthToggle: () => dispatch(actions.authToggle()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(Auth));
