import React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
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

const reformat = skills => (skills ? skills.join(', ') : '');

const ProfileView = ({ classes, onEditUserInit, user, userError }) => {
  let output;

  if (userError) {
    output = (
      <Card className={classes.card} style={{ textAlign: 'center' }}>
        <ErrorMessage error={userError.text} />
        <Button
          onClick={onEditUserInit}
          variant="contained"
          color="primary"
          style={{ margin: '25px 0' }}>
          Create profile
        </Button>
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
              <ListItemText
                primary={moment(user.birthDate).format('DD.MM.YYYY')}
                secondary="Date of birth"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText
                primary={reformat(user.skills)}
                secondary="List of skills"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }

  return output;
};

export default withStyles(style)(ProfileView);
