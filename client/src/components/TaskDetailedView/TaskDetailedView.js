import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Delete, Edit, Cancel, Done } from '@material-ui/icons';

import SelectItem from '../form/SelectItem';
import Input from '../form/Input';
import normalizeField from '../../utils/normalizeField';

const statusTypes = ['To Do', 'In Progress', 'Peer Review', 'Done'];

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

const validateTask = ({ title, description }) => {
  const errors = {};

  if (!title) {
    errors.title = 'Title is required';
  } else if (title.length < 4 || title.length > 50) {
    errors.title = 'Title must be between 4 and 50 characters';
  }

  if (!description) {
    errors.description = 'Description is required';
  } else if (description.length < 10 || description.length > 300) {
    errors.description = 'Title must be between 10 and 300 characters';
  }

  return errors;
};

const style = {
  header: {
    maxWidth: '960px',
    margin: '0 auto 25px',
    fontSize: '32px',
    fontWeight: '600',
  },
  card: {
    maxWidth: '960px',
    margin: '0 auto 15px',
    position: 'relative',
  },
};

const TaskDetailedView = ({
  classes,
  task,
  isAdmin,
  changing,
  onChangeTaskInit,
  handleSubmit,
  dirty,
  invalid,
  users,
  onRemoveTask,
  userId,
  onChangeTask,
  onChangeCancel,
  onSelectChange,
  onChangeType,
  reset,
}) => {
  let titleOutput = (
    <Typography color="primary" variant="headline" className={classes.header}>
      {task.title}
      {isAdmin && (
        <IconButton onClick={() => onChangeTaskInit('title')}>
          <Edit />
        </IconButton>
      )}
    </Typography>
  );

  let descriptionOutput = (
    <Typography
      variant="headline"
      className="mb-15"
      style={{ marginRight: '50px' }}>
      {task.description}
      {isAdmin && (
        <IconButton onClick={() => onChangeTaskInit('description')}>
          <Edit />
        </IconButton>
      )}
    </Typography>
  );

  if (changing === 'title') {
    titleOutput = (
      <Typography color="primary" variant="headline" className={classes.header}>
        <form onSubmit={handleSubmit(onChangeTask)}>
          <Field
            name="title"
            component={Input}
            label="Title"
            normalize={normalizeField}
          />
          <IconButton
            disabled={!dirty || invalid}
            color="primary"
            type="submit">
            <Done />
          </IconButton>
          <IconButton
            onClick={() => {
              reset();
              onChangeCancel();
            }}>
            <Cancel />
          </IconButton>
        </form>
      </Typography>
    );
  }

  if (changing === 'description') {
    descriptionOutput = (
      <form
        onSubmit={handleSubmit(onChangeTask)}
        style={{ marginRight: '50px' }}>
        <Field
          name="description"
          component={Input}
          multiline
          rows="3"
          label="Description"
          normalize={normalizeField}
        />
        <IconButton disabled={!dirty || invalid} color="primary" type="submit">
          <Done />
        </IconButton>
        <IconButton
          onClick={() => {
            reset();
            onChangeCancel();
          }}>
          <Cancel />
        </IconButton>
      </form>
    );
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        {titleOutput}
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            {descriptionOutput}
            <SelectItem
              isAdmin={isAdmin}
              task={task}
              users={users}
              onSelectChange={onSelectChange}
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
                  onClick={
                    type !== task.status ? () => onChangeType(type) : null
                  }
                  variant={type === task.status ? 'contained' : 'text'}
                  key={type}>
                  {type}
                </Button>
              ))}
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    title: ownProps.task.title,
    description: ownProps.task.description,
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'taskEdit',
    enableReinitialize: true,
    validate: validateTask,
  })(withStyles(style)(TaskDetailedView)),
);
