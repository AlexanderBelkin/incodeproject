import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, CircularProgress, withStyles } from '@material-ui/core';
import * as actions from '../../store/actions/index';
import Comments from '../../components/Comments/Comments';
import TaskDetailedView from '../../components/TaskDetailedView/TaskDetailedView';

const style = {
  container: {
    padding: '0 15px',
    marginTop: '25px',
  },
};

class TaskDetailed extends Component {
  constructor(props) {
    super(props);

    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    const { onFetchTask, onFetchUsers, match } = this.props;
    onFetchTask(match.params.id);
    onFetchUsers();
  }

  componentWillUnmount() {
    const { onChangeTaskCancel } = this.props;
    onChangeTaskCancel();
  }

  handleChangeTask(textField) {
    const { task, onChangeTask, changing } = this.props;

    const newTask = { ...task };

    if (changing === 'description') {
      newTask.description = textField.description;
    } else if (changing === 'title') {
      newTask.title = textField.title;
    }

    onChangeTask(newTask);
  }

  handleChangeType(type) {
    const { task, onChangeTask } = this.props;

    const newTask = { ...task };
    newTask.status = type;

    onChangeTask(newTask);
  }

  handleSelectChange(e) {
    const { task, onChangeTask } = this.props;

    if (e.target.value !== task.performerId) {
      const newTask = { ...task };
      newTask.performerId = e.target.value;
      onChangeTask(newTask);
    }
  }

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
      onAddTaskComment,
      onChangeTaskCancel,
      changing,
    } = this.props;

    if (taskLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return (
      <Grid container justify="center" className={classes.container}>
        <TaskDetailedView
          task={task}
          isAdmin={isAdmin}
          changing={changing}
          users={users}
          userId={userId}
          onChangeTaskInit={onChangeTaskInit}
          onRemoveTask={onRemoveTask}
          onChangeCancel={onChangeTaskCancel}
          onChangeTask={this.handleChangeTask}
          onSelectChange={this.handleSelectChange}
          onChangeType={this.handleChangeType}
        />
        <Grid item xs={12}>
          <Comments
            id={match.params.id}
            comments={task.comments}
            onAddTaskComment={onAddTaskComment}
          />
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
});

const mapDispatchToProps = dispatch => ({
  onFetchTask: id => dispatch(actions.fetchTask(id)),
  onChangeTaskInit: changing => dispatch(actions.changeTaskInit(changing)),
  onChangeTaskCancel: () => dispatch(actions.changeTaskCancel()),
  onChangeTask: task => dispatch(actions.changeTask(task)),
  onFetchUsers: () => dispatch(actions.fetchUsers()),
  onRemoveTask: taskId => dispatch(actions.removeTask(taskId)),
  onAddTaskComment: (comment, id) =>
    dispatch(actions.addTaskComment(comment, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(TaskDetailed));
