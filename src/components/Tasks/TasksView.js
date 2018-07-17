import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, withStyles } from '@material-ui/core';

import TaskItem from './TaskItem';

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

const TaskView = ({
  classes,
  tasks,
  isAdmin,
  onTaskStatusChange,
  onSetCurrentTask,
}) => (
  <Grid container justify="center" className={classes.container}>
    <Grid item xs={12}>
      <Typography color="primary" variant="headline" className={classes.header}>
        Task List
      </Typography>
    </Grid>
    <Grid item xs={12}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          onSetCurrentTask={onSetCurrentTask}
          onTaskStatusChange={onTaskStatusChange}
          isAdmin={isAdmin}
          task={task}
        />
      ))}
    </Grid>
  </Grid>
);

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(withStyles(style)(TaskView));
