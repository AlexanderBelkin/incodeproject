import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  IconButton,
  ListItem,
  List,
  withStyles,
} from '@material-ui/core';
import {
  Mail,
  Person,
  DateRange,
  Cancel,
  Done,
  School,
} from '@material-ui/icons';

import Input from '../../../components/form/Input';

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

const validateProfile = ({ name, email, birthDate }) => {
  const errors = {};

  const birthMask = /\d{2}-\d{2}-\d{4}/;
  const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please, write your email properly.';
  }

  if (!birthDate) {
    errors.birthDate = 'Please, provide your date of birth';
  } else if (!birthMask.test(birthDate)) {
    errors.birthDate = 'Please, write your date of birth properly';
  }

  return errors;
};

const ProfileEdit = ({
  classes,
  user,
  onEditCancel,
  onEditUser,
  handleSubmit,
}) => (
  <Card className={classes.card}>
    <form onSubmit={handleSubmit(onEditUser)}>
      <div className={classes.controls}>
        <IconButton
          aria-label="Cancel"
          color="secondary"
          onClick={onEditCancel}>
          <Cancel />
        </IconButton>
        <IconButton type="submit" aria-label="Edit" color="primary">
          <Done />
        </IconButton>
      </div>
      <CardContent>
        <List>
          <ListItem>
            <Field
              name="name"
              value={user.name}
              component={Input}
              label="Name"
              Icon={Person}
            />
          </ListItem>
          <ListItem>
            <Field
              name="email"
              value={user.email}
              component={Input}
              label="Email"
              Icon={Mail}
            />
          </ListItem>
          <ListItem>
            <Field
              name="birthDate"
              value={user.birthDate}
              component={Input}
              label="Date of birth"
              Icon={DateRange}
            />
          </ListItem>
          <ListItem>
            <Field
              name="skills"
              value={user.skills ? user.skills.join(', ') : ''}
              component={Input}
              label="Enter your skills"
              Icon={School}
            />
          </ListItem>
        </List>
      </CardContent>
    </form>
  </Card>
);

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    name: ownProps.user.name,
    email: ownProps.user.email,
    birthDate: ownProps.user.birthDate,
    skills: ownProps.user.skills ? ownProps.user.skills.join(', ') : '',
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'editProfile',
    enableReinitialize: true,
    validate: validateProfile,
  })(withStyles(style)(ProfileEdit)),
);
