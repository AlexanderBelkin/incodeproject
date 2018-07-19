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

  render() {
    const {
      tasks,
      tasksLoading,
      userId,
      showAll,
      isAdmin,
      onSetCurrentTask,
      onChangeTaskStatus,
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
        isAdmin={isAdmin}
        onChangeTaskStatus={onChangeTaskStatus}
        onSetCurrentTask={onSetCurrentTask}
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
  onSetCurrentTask: task => dispatch(actions.setCurrentTask(task)),
  onChangeTaskStatus: (taskId, newStatus) =>
    dispatch(actions.changeTaskStatus(taskId, newStatus)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
