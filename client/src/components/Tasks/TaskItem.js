import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  withStyles,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import SelectItem from '../form/SelectItem';

const style = {
  card: {
    maxWidth: '960px',
    margin: '0 auto 15px',
    position: 'relative',
  },
  title: {
    textDecoration: 'none',
    color: '#222',
  },
};

const isDisabled = (userId, performerId, isAdmin, type) => {
  if (isAdmin) {
    return false;
  }
  if (!isAdmin && type === 'Done') {
    return true;
  }
  if (performerId === userId) {
    return false;
  }
  return true;
};

const statusTypes = ['To Do', 'In Progress', 'Peer Review', 'Done'];

const TaskItem = ({
  task,
  classes,
  onChangeTask,
  isAdmin,
  onSelectChange,
  userId,
  onRemoveTask,
  users,
}) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography
        variant="title"
        className="mb-15"
        style={{ marginRight: '50px' }}>
        <Link
          style={{ textDecoration: 'none', color: '#222' }}
          to={`/task/${task._id}`}>
          {task.title}
        </Link>
      </Typography>
      <Typography variant="subheading" className="mb-15">
        {task.description.length > 100
          ? `${task.description.slice(0, 100)}...`
          : task.description}
      </Typography>
      <SelectItem
        isAdmin={isAdmin}
        task={task}
        users={users}
        onSelectChange={e => onSelectChange(e, task)}
        selectName="Performer"
      />
      {isAdmin && (
        <IconButton
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          color="secondary"
          onClick={() => onRemoveTask(task._id)}>
          <Delete />
        </IconButton>
      )}
      <CardActions>
        {statusTypes.map(type => (
          <Button
            className="button"
            disabled={isDisabled(userId, task.performerId, isAdmin, type)}
            onClick={() => onChangeTask(task, type)}
            variant={type === task.status ? 'contained' : 'text'}
            key={type}>
            {type}
          </Button>
        ))}
      </CardActions>
    </CardContent>
  </Card>
);

export default withStyles(style)(TaskItem);
