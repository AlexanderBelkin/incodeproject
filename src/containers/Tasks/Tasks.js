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

  handleTaskStatusChange = (taskId, newStatus) => {
    const { tasks, onChangeTaskStatus } = this.props;
    const item = tasks.find(task => task.id === taskId);
    if (item) {
      item.status = newStatus;
    }
    onChangeTaskStatus(tasks);
    this.forceUpdate(); // TODO: исправить, когда будет бекэнд
  };

  render() {
    const { tasks, tasksLoading } = this.props;

    if (tasksLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return (
      <TasksView
        onTaskStatusChange={(taskId, newStatus) =>
          this.handleTaskStatusChange(taskId, newStatus)
        }
        tasks={tasks}
      />
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  tasksLoading: state.tasks.loading,
});

const mapDispatchToProps = dispatch => ({
  onFetchTasks: () => dispatch(actions.fetchTasks()),
  onChangeTaskStatus: tasks => dispatch(actions.changeTaskStatus(tasks)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
