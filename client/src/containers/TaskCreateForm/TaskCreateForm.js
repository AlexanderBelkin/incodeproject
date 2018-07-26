import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  ListItem,
  List,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core';

import Input from '../../components/form/Input';
import SelectField from '../../components/form/SelectField';
import * as actions from '../../store/actions/index';

const style = {
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
  },
  button: {
    margin: '10px',
  },
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

class TaskCreateForm extends Component {
  componentDidMount() {
    const { onFetchUsers } = this.props;
    onFetchUsers();
  }

  handleCancelClick = () => {
    const { history } = this.props;

    history.goBack();
  };

  render() {
    const {
      classes,
      users,
      handleSubmit,
      onCreateTask,
      taskCreated,
      currentTask,
      invalid,
    } = this.props;

    if (taskCreated) {
      return <Redirect to={`/task/${currentTask._id}`} />;
    }

    return (
      <Card className={classes.card}>
        <form onSubmit={handleSubmit(onCreateTask)}>
          <CardContent>
            <Typography variant="headline">Create new task</Typography>
            <List>
              <ListItem>
                <Field name="title" component={Input} label="Title" />
              </ListItem>
              <ListItem>
                <Field
                  multiline
                  rows={4}
                  name="description"
                  component={Input}
                  label="Description"
                />
              </ListItem>
              <ListItem>
                <Field
                  name="performerId"
                  users={users}
                  component={SelectField}
                  label="Performer"
                />
              </ListItem>
            </List>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Button
                disabled={invalid}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}>
                Create Task
              </Button>
              <Button
                onClick={this.handleCancelClick}
                variant="contained"
                color="secondary"
                className={classes.button}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  taskCreated: state.tasks.created,
  currentTask: state.tasks.currentTask,
});

const mapDispatchToProp = dispatch => ({
  onFetchUsers: () => dispatch(actions.fetchUsers()),
  onCreateTask: task => dispatch(actions.createTask(task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(
  reduxForm({
    form: 'taskCreateForm',
    validate: validateTask,
  })(withStyles(style)(TaskCreateForm)),
);
