import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  withStyles,
} from '@material-ui/core';

const style = {
  card: {
    maxWidth: '960px',
    margin: '0 auto 15px',
    cursor: 'pointer',
  },
  title: {
    textDecoration: 'none',
    color: '#222',
  },
  link: {
    textDecoration: 'none',
  },
};

const UserItem = ({ user, classes, onOpenChat }) => (
  <Card className={classes.card} onClick={() => onOpenChat(user)}>
    <CardHeader title={user.name} subheader={user.birthDate} />
    <CardContent>
      <Typography variant="subheading">Email: {user.email}</Typography>
      <Typography variant="subheading">
        Skills: {user.skills.join(', ')}
      </Typography>
    </CardContent>
  </Card>
);

export default withStyles(style)(UserItem);
