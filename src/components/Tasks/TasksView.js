import React from 'react';
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
  userId,
  isAdmin,
  onSetCurrentTask,
  onChangeTaskStatus,
}) => (
  <Grid container justify="center" className={classes.container}>
    <Grid item xs={12}>
      <Typography color="primary" variant="headline" className={classes.header}>
        Task List
      </Typography>
    </Grid>
    <Grid item xs={12}>
      {tasks.map(
        task =>
          // output all tasks if userId isn't passed
          !userId || userId === task.userId ? (
            <TaskItem
              isAdmin={isAdmin}
              onChangeTaskStatus={onChangeTaskStatus}
              onSetCurrentTask={onSetCurrentTask}
              key={task.id}
              task={task}
            />
          ) : null,
      )}
    </Grid>
  </Grid>
);

export default withStyles(style)(TaskView);
