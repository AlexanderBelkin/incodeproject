import React from 'react';
import {
  Card,
  CardHeader,
  Typography,
  withStyles,
  CardContent,
} from '@material-ui/core';

const style = {
  comments: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '15px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '30px',
  },
};

const CommentsView = ({ classes, comments }) => (
  <div className={classes.comments}>
    <Typography color="primary" variant="headline" className={classes.header}>
      Comments
    </Typography>
    {comments.map(comment => (
      <Card key={comment.date}>
        <CardHeader title={comment.userName} subheader={comment.date} />
        <CardContent>{comment.text}</CardContent>
      </Card>
    ))}
  </div>
);

export default withStyles(style)(CommentsView);
