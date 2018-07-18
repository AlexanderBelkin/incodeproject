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
  onChangeTaskStatus,
  onSetCurrentTask,
  isAdmin,
}) => (
  <Card className={classes.card}>
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
            disabled={!isAdmin && type === 'Done'}
            onClick={() => onChangeTaskStatus(task.id, type)}
            variant={type === task.status ? 'contained' : 'text'}
            key={type}>
            {type}
          </Button>
        ))}
      </CardActions>
    </CardContent>
  </Card>
);

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
});

const mapDispatchToProps = dispatch => ({
  onSetCurrentTask: task => dispatch(actions.setCurrentTask(task)),
  onChangeTaskStatus: (taskId, newStatus) =>
    dispatch(actions.changeTaskStatus(taskId, newStatus)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(TaskItem));
