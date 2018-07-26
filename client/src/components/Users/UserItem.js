import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  withStyles,
} from '@material-ui/core';
import moment from 'moment';

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

const UserItem = ({ user, classes }) => (
  <Link to={`/tasks/${user._id}`} style={{ textDecoration: 'none' }}>
    <Card className={classes.card}>
      <CardHeader
        title={user.name ? user.name : user.login}
        subheader={
          user.birthDate
            ? `Date of birth: ${moment(user.birthDate).format('DD.MM.YYYY')}`
            : null
        }
      />
      <CardContent>
        <Typography variant="subheading">Email: {user.email}</Typography>
        <Typography variant="subheading">
          {user.skills && user.skills.length > 0
            ? `Skills: ${user.skills.join(', ')}`
            : "User didn't add skills yet"}
        </Typography>
      </CardContent>
    </Card>
  </Link>
);

export default withStyles(style)(UserItem);
