import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  IconButton,
  withStyles,
} from '@material-ui/core';
import { Delete, Edit, Cancel, Done } from '@material-ui/icons';
import * as actions from '../../store/actions/index';
import Comments from '../Comments/Comments';
import SelectItem from '../../components/form/SelectItem';
import Input from '../../components/form/Input';
import normalizeField from '../../utils/normalizeField';

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
    position: 'relative',
  },
};

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

class TaskDetailed extends Component {
  componentDidMount() {
    const { onFetchTask, onFetchUsers, match } = this.props;
    onFetchTask(match.params.id);
    onFetchUsers();
  }

  componentWillUnmount() {
    const { onChangeTaskCancel } = this.props;
    onChangeTaskCancel();
  }

  handleChangeTask = textField => {
    const { task, onChangeTask, changing } = this.props;

    const newTask = { ...task };

    if (changing === 'description') {
      newTask.description = textField.description;
    } else if (changing === 'title') {
      newTask.title = textField.title;
    }

    onChangeTask(newTask);
  };

  handleChangeCancel = () => {
    const { reset, onChangeTaskCancel } = this.props;

    reset();
    onChangeTaskCancel();
  };

  handleChangeType = type => {
    const { task, onChangeTask } = this.props;

    const newTask = { ...task };
    newTask.status = type;

    onChangeTask(newTask);
  };

  handleSelectChange = e => {
    const { task, onChangeTask } = this.props;

    const newTask = { ...task };
    newTask.performerId = e.target.value;
    onChangeTask(newTask);
  };

  render() {
    const {
      classes,
      task,
      isAdmin,
      taskLoading,
      match,
      users,
      userId,
      onRemoveTask,
      onChangeTaskInit,
      changing,
      handleSubmit,
      dirty,
      invalid,
    } = this.props;

    if (taskLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

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
        <Typography
          color="primary"
          variant="headline"
          className={classes.header}>
          <form onSubmit={handleSubmit(this.handleChangeTask)}>
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
            <IconButton onClick={this.handleChangeCancel}>
              <Cancel />
            </IconButton>
          </form>
        </Typography>
      );
    }

    if (changing === 'description') {
      descriptionOutput = (
        <form
          onSubmit={handleSubmit(this.handleChangeTask)}
          style={{ marginRight: '50px' }}>
          <Field
            name="description"
            component={Input}
            multiline
            rows="3"
            label="Description"
            normalize={normalizeField}
          />
          <IconButton
            disabled={!dirty || invalid}
            color="primary"
            type="submit">
            <Done />
          </IconButton>
          <IconButton onClick={this.handleChangeCancel}>
            <Cancel />
          </IconButton>
        </form>
      );
    }

    return (
      <Grid container justify="center" className={classes.container}>
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
                onSelectChange={this.handleSelectChange}
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
                    disabled={isDisabled(
                      userId,
                      task.performerId,
                      isAdmin,
                      type,
                    )}
                    onClick={() => this.handleChangeType(type)}
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
          <Comments match={match} comments={task.comments} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  userId: state.auth.userId,
  task: state.tasks.currentTask,
  taskLoading: state.tasks.loading,
  users: state.users.users,
  changing: state.tasks.changing,
  initialValues: {
    title: state.tasks.currentTask.title,
    description: state.tasks.currentTask.description,
  },
});

const mapDispatchToProps = dispatch => ({
  onFetchTask: id => dispatch(actions.fetchTask(id)),
  onChangeTaskInit: changing => dispatch(actions.changeTaskInit(changing)),
  onChangeTaskCancel: () => dispatch(actions.changeTaskCancel()),
  onChangeTask: task => dispatch(actions.changeTask(task)),
  onFetchUsers: () => dispatch(actions.fetchUsers()),
  onRemoveTask: taskId => dispatch(actions.removeTask(taskId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'taskEdit',
    enableReinitialize: true,
    validate: validateTask,
  })(withStyles(style)(TaskDetailed)),
);
