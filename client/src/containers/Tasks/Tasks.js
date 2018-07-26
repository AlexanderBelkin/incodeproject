import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import TasksView from '../../components/Tasks/TasksView';

class Tasks extends Component {
  componentDidMount = () => {
    const { onFetchTasks, onFetchUsers, match } = this.props;
    if (match && match.params.id) {
      onFetchTasks(match.params.id);
    } else {
      onFetchTasks();
    }
    onFetchUsers();
  };

  handleChangeTask = (task, type) => {
    const { onChangeTask } = this.props;

    const newTask = { ...task };
    newTask.status = type;

    onChangeTask(newTask);
  };

  handleSelectChange = (e, task) => {
    const { onChangeTask } = this.props;

    const newTask = { ...task };
    newTask.performerId = e.target.value;
    onChangeTask(newTask);
  };

  render() {
    const {
      tasks,
      tasksLoading,
      userId,
      isAdmin,
      users,
      onRemoveTask,
    } = this.props;

    if (tasksLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return (
      <TasksView
        onRemoveTask={onRemoveTask}
        isAdmin={isAdmin}
        onChangeTask={this.handleChangeTask}
        onSelectChange={this.handleSelectChange}
        users={users}
        userId={userId}
        tasks={tasks}
      />
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  tasks: state.tasks.tasks,
  tasksLoading: state.tasks.loading,
  isAdmin: state.auth.isAdmin,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  onFetchTasks: userId => dispatch(actions.fetchTasks(userId)),
  onChangeTask: task => dispatch(actions.changeTask(task)),
  onFetchUsers: () => dispatch(actions.fetchUsers()),
  onRemoveTask: taskId => dispatch(actions.removeTask(taskId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
