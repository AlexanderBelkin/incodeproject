import React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Mail,
  Edit,
  Person,
  DateRange,
  School,
  Cancel,
  Done,
} from '@material-ui/icons';

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

const ProfileView = ({ classes, user, onEditCancel, onEditSuccess }) => (
  <Card className={classes.card}>
    <div className={classes.controls}>
      <IconButton aria-label="Cancel" color="secondary" onClick={onEditCancel}>
        <Cancel />
      </IconButton>
      <IconButton aria-label="Edit" color="primary" onClick={onEditSuccess}>
        <Done />
      </IconButton>
    </div>
    <CardContent>Editing</CardContent>
  </Card>
);

ProfileView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(ProfileView);
