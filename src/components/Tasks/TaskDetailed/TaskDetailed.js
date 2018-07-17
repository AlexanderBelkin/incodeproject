import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  withStyles,
} from '@material-ui/core';
import * as actions from '../../../store/actions/index';
import Comments from '../../../containers/Comments/Comments';

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
    margin: '0 auto 15px',
  },
};

const statusTypes = ['To Do', 'In Progress', 'Peer Review', 'Done'];

const TaskDetailed = ({ classes, task, isAdmin }) => (
  <Grid container justify="center" className={classes.container}>
    <Grid item xs={12}>
      <Typography color="primary" variant="headline" className={classes.header}>
        {task.title}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Card key={task.id} className={classes.card}>
        <CardContent>
          <Typography variant="headline">{task.description}</Typography>
          <CardActions>
            {statusTypes.map(type => (
              <Button
                disabled={!isAdmin}
                variant={type === task.status ? 'contained' : 'text'}
                key={type}>
                {type}
              </Button>
            ))}
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Comments />
    </Grid>
  </Grid>
);

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  task: state.tasks.currentTask,
});

const mapDispatchToProps = dispatch => ({
  onTaskStatusChange: () => dispatch(actions.changeTaskStatus()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(TaskDetailed));
