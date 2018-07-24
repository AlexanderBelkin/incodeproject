import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import TasksView from '../../components/Tasks/TasksView';

class Tasks extends Component {
  componentDidMount = () => {
    const { onFetchTasks } = this.props;
    onFetchTasks();
  };

  handleChangeTask = (task, type) => {
    const { onChangeTask } = this.props;

    const newTask = { ...task };
    newTask.status = type;

    onChangeTask(newTask);
  };

  render() {
    const { tasks, tasksLoading, userId, showAll, isAdmin } = this.props;

    if (tasksLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return (
      <TasksView
        isAdmin={isAdmin}
        onChangeTask={this.handleChangeTask}
        userId={showAll ? null : userId}
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
});

const mapDispatchToProps = dispatch => ({
  onFetchTasks: () => dispatch(actions.fetchTasks()),
  onChangeTask: task => dispatch(actions.changeTask(task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
