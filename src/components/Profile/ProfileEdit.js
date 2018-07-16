import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Card,
  CardContent,
  IconButton,
  ListItem,
  List,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Mail,
  Person,
  DateRange,
  Cancel,
  Done,
  School,
} from '@material-ui/icons';

import Input from '../form/Input';
import { validateProfile } from '../../utils/validateProfile';

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

const ProfileEdit = ({
  classes,
  user,
  onEditCancel,
  onEditSuccess,
  handleSubmit,
}) => (
  <Card className={classes.card}>
    <form onSubmit={handleSubmit(onEditSuccess)}>
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
        </List>
      </CardContent>
    </form>
  </Card>
);

ProfileEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'editProfile',
  validate: validateProfile,
})(withStyles(style)(ProfileEdit));
