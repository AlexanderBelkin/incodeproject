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

const CommentsView = ({ classes }) => (
  <div className={classes.comments}>
    <Typography color="primary" variant="headline" className={classes.header}>
      Comments
    </Typography>
    <Card>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
        repudiandae nobis architecto quidem quod molestias ducimus ab aliquid
        vero quo voluptatem, assumenda non deleniti, vitae eligendi laudantium
        dolores ratione repellat?
      </CardContent>
    </Card>
  </div>
);

export default withStyles(style)(CommentsView);
