import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
} from '@material-ui/core';

import * as actions from '../../store/actions/index';

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

const statusTypes = ['To Do', 'In Progress', 'Peer Review', 'Done'];

const TaskItem = ({
  task,
  classes,
  onTaskStatusChange,
  onSetCurrentTask,
  isAdmin,
}) => (
  <Card key={task.id} className={classes.card}>
    <CardContent>
      <Typography variant="title">
        <Link
          onClick={() => onSetCurrentTask(task)}
          style={{ textDecoration: 'none', color: '#222' }}
          to={`/task/${task.id}`}>
          {task.title}
        </Link>
      </Typography>
      <Typography variant="subheading">
        {task.description.length > 100
          ? `${task.description.slice(0, 100)}...`
          : task.description}
      </Typography>
      <CardActions>
        {statusTypes.map(type => (
          <Button
            disabled={!isAdmin}
            onClick={() => onTaskStatusChange(task.id, type)}
            variant={type === task.status ? 'contained' : 'text'}
            key={type}>
            {type}
          </Button>
        ))}
      </CardActions>
    </CardContent>
  </Card>
);

const mapDispatchToProps = dispatch => ({
  onSetCurrentTask: task => dispatch(actions.setCurrentTask(task)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(style)(TaskItem));
