import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Button,
  withStyles,
} from '@material-ui/core';

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
  card: {
    maxWidth: '960px',
    margin: '0 auto',
    position: 'relative',
  },
};

const statusTypes = ['To Do', 'In Progress', 'Peer Review', 'Done'];

const typeColor = type => {
  switch (type) {
    case 'To Do':
      return 'default';
    case 'In Progress':
      return 'primary';
    case 'Peer Review':
      return 'secondary';
    case 'Done':
      return 'default';

    default:
      return null;
  }
};

const TaskView = ({ tasks, classes }) => (
  <Grid container justify="center" className={classes.container}>
    <Grid item xs={12}>
      <Typography color="primary" variant="headline" className={classes.header}>
        Task List
      </Typography>
    </Grid>
    <Grid item xs={12}>
      {tasks.map(task => (
        <Card key={task.id} className={classes.card}>
          <CardContent>
            <Typography variant="title">{task.title}</Typography>
            <Typography variant="subheading">{task.description}</Typography>
            <CardActions>
              {statusTypes.map(type => (
                <Button
                  disabled
                  variant={type === task.status ? 'contained' : 'text'}
                  color={typeColor(type)}
                  key={type}>
                  {type}
                </Button>
              ))}
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </Grid>
  </Grid>
);

export default withStyles(style)(TaskView);
