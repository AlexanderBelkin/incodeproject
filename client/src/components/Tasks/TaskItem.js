import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
} from '@material-ui/core';

import SelectItem from '../form/SelectItem';

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
  onChangeTask,
  isAdmin,
  onSelectChange,
  users,
}) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="title" className="mb-15">
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
        task={task}
        users={users}
        onSelectChange={e => onSelectChange(e, task)}
        selectName="Performer"
      />
      <CardActions>
        {statusTypes.map(type => (
          <Button
            className="button"
            disabled={!isAdmin && type === 'Done'} // TODO: disabled if isn't user task
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
