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
import { Mail, Edit, Person, DateRange, School } from '@material-ui/icons';
import moment from 'moment';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

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

const ProfileView = ({ classes, onEditUserInit, user, userError }) => {
  let output;

  if (userError) {
    output = (
      <Card className={classes.card} style={{ textAlign: 'center' }}>
        <ErrorMessage error={userError.text} />
      </Card>
    );
  } else {
    output = (
      <Card className={classes.card}>
        <div className={classes.controls}>
          <IconButton aria-label="Edit" onClick={onEditUserInit}>
            <Edit />
          </IconButton>
        </div>
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              {user.name ? (
                <ListItemText primary={user.name} secondary="Name" />
              ) : (
                <ListItemText secondary="Please add your name" />
              )}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              {user.email ? (
                <ListItemText primary={user.email} secondary="Email" />
              ) : (
                <ListItemText secondary="Please add your email" />
              )}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DateRange />
              </ListItemIcon>
              {user.birthDate ? (
                <ListItemText
                  primary={moment(user.birthDate).format('MM.DD.YYYY')}
                  secondary="Date of birth"
                />
              ) : (
                <ListItemText secondary="Please add your Birthday date" />
              )}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <School />
              </ListItemIcon>
              {user.skills && user.skills.length > 0 ? (
                <ListItemText
                  primary={user.skills.join(', ')}
                  secondary="List of skills"
                />
              ) : (
                <ListItemText secondary="Please add your skills" />
              )}
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }

  return output;
};

export default withStyles(style)(ProfileView);
