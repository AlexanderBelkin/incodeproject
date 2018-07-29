import React, { Component } from 'react';
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
import moment from 'moment';

import Input from '../form/Input';
import normalizeField from '../../utils/normalizeField';
import normalizeDate from '../../utils/normalizeDate';

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

const validateProfile = ({ name, email, birthDate, skills }) => {
  const errors = {};
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const datePattern = /^(\d{2})\.(\d{2})\.(\d{4})$/;

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please, write your email properly.';
  }

  const date = birthDate.split('.');

  if (!birthDate) {
    errors.birthDate = 'Please, provide your date of birth';
  } else if (!datePattern.test(birthDate)) {
    errors.birthDate = 'Please, write your date of birth in format mm.dd.yyyy';
  } else if (
    Number(date[0]) > 12 ||
    Number(date[0]) < 1 ||
    Number(date[1]) > 31 ||
    Number(date[1]) < 1 ||
    Number(date[2]) > 2001 ||
    Number(date[2]) < 1900
  ) {
    errors.birthDate = 'Please, write your date of birth in format mm.dd.yyyy';
  }

  if (!skills) {
    errors.skills = 'Skills is required';
  }

  return errors;
};

class ProfileEdit extends Component {
  componentWillUnmount() {
    const { onEditCancel } = this.props;
    onEditCancel();
  }

  render() {
    const {
      classes,
      onEditCancel,
      onEditUser,
      handleSubmit,
      dirty,
      invalid,
    } = this.props;
    return (
      <Card className={classes.card}>
        <form onSubmit={handleSubmit(onEditUser)}>
          <div className={classes.controls}>
            <IconButton
              aria-label="Cancel"
              color="secondary"
              onClick={onEditCancel}>
              <Cancel />
            </IconButton>
            <IconButton
              disabled={!dirty || invalid}
              type="submit"
              aria-label="Edit"
              color="primary">
              <Done />
            </IconButton>
          </div>
          <CardContent>
            <List>
              <ListItem>
                <Field
                  name="name"
                  component={Input}
                  label="Name"
                  Icon={Person}
                  normalize={normalizeField}
                />
              </ListItem>
              <ListItem>
                <Field
                  name="email"
                  component={Input}
                  label="Email"
                  Icon={Mail}
                  normalize={normalizeField}
                />
              </ListItem>
              <ListItem>
                <Field
                  name="birthDate"
                  component={Input}
                  label="Date of birth"
                  Icon={DateRange}
                  normalize={normalizeDate}
                />
              </ListItem>
              <ListItem>
                <Field
                  name="skills"
                  component={Input}
                  label="Enter your skills"
                  Icon={School}
                  normalize={normalizeField}
                />
              </ListItem>
            </List>
          </CardContent>
        </form>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    name: ownProps.user.name,
    email: ownProps.user.email,
    birthDate: ownProps.user.birthDate
      ? moment(ownProps.user.birthDate).format('MM.DD.YYYY')
      : '',
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
