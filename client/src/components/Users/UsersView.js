import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import UserItem from './UserItem';

const style = {
  container: {
    padding: '0 15px',
    marginTop: '25px',
  },
  header: {
    maxWidth: '960px',
    margin: '0 auto 25px',
    fontSize: '32px',
    fontWeight: '600',
  },
};

const UsersView = ({ classes, users, isChatOpened, onOpenChat }) => (
  <Grid container justify="center" className={classes.container}>
    <Grid item xs={12}>
      <Typography color="primary" variant="headline" className={classes.header}>
        Users
      </Typography>
    </Grid>
    <Grid item xs={12}>
      {users.map(user => (
        <UserItem
          key={user._id}
          user={user}
          isChatOpened={isChatOpened}
          onOpenChat={onOpenChat}>
          {user.name}
        </UserItem>
      ))}
    </Grid>
  </Grid>
);

export default withStyles(style)(UsersView);
