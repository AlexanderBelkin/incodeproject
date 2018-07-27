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

const TasksView = ({
  classes,
  tasks,
  isAdmin,
  onChangeTask,
  onSelectChange,
  onRemoveTask,
  userId,
  users,
}) => (
  <Grid container justify="center" className={classes.container}>
    <Grid item xs={12}>
      <Typography color="primary" variant="headline" className={classes.header}>
        {tasks.length > 0 ? 'Task List' : 'There is no tasks yet'}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      {tasks.map(task => (
        <TaskItem
          onRemoveTask={onRemoveTask}
          isAdmin={isAdmin}
          users={users}
          userId={userId}
          onSelectChange={onSelectChange}
          onChangeTask={onChangeTask}
          key={task._id}
          task={task}
        />
      ))}
    </Grid>
  </Grid>
);

export default withStyles(style)(TasksView);
