import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import TaskView from '../../components/Tasks/TaskView';

class Tasks extends Component {
  componentDidMount = () => {
    const { onFetchTasks } = this.props;
    onFetchTasks();
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

    return <TaskView tasks={tasks} />;
  }
}

const mapStateToProps = state => ({
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
