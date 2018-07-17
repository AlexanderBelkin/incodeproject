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
import { Mail, Edit, Person, DateRange, School } from '@material-ui/icons';

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
const reformat = skills => (skills ? skills.join(', ') : '');

const ProfileView = ({ classes, onEditUser, user }) => (
  <Card className={classes.card}>
    <div className={classes.controls}>
      <IconButton aria-label="Edit" onClick={onEditUser}>
        <Edit />
      </IconButton>
    </div>
    <CardContent>
      <List>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={user.name} secondary="Name" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary={user.email} secondary="Email" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DateRange />
          </ListItemIcon>
          <ListItemText primary={user.birthDate} secondary="Date of birth" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText
            primary={reformat(user.skills)} // TODO: не работает join
            secondary="List of skills"
          />
        </ListItem>
      </List>
    </CardContent>
  </Card>
);

ProfileView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(ProfileView);
