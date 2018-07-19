import React from 'react';
import { connect } from 'react-redux';
import { Card, withStyles } from '@material-ui/core';

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

const Auth = ({ classes }) => (
  <Card className={classes.card}>
    <LoginForm />
  </Card>
);

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withStyles(style)(Auth));
