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
  },
  title: {
    textDecoration: 'none',
    color: '#222',
  },
};

const UserItem = ({ user, classes }) => (
  <Card className={classes.card}>
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
