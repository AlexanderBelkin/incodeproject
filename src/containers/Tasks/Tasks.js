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
    const { tasks, tasksLoading, userId } = this.props;

    if (tasksLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return <TasksView userId={userId} tasks={tasks} />;
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  tasks: state.tasks.tasks,
  tasksLoading: state.tasks.loading,
});

const mapDispatchToProps = dispatch => ({
  onFetchTasks: () => dispatch(actions.fetchTasks()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
