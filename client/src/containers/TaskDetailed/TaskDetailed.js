import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import * as actions from '../../store/actions/index';
import Comments from '../Comments/Comments';
import SelectItem from '../../components/form/SelectItem';

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

class TaskDetailed extends Component {
  componentDidMount() {
    const { onFetchTask, onFetchUsers, match } = this.props;
    onFetchTask(match.params.id);
    onFetchUsers();
  }

  handleChangeTask = type => {
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
        <Grid item xs={12}>
          <Typography
            color="primary"
            variant="headline"
            className={classes.header}>
            {task.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="headline" className="mb-15">
                {task.description}
              </Typography>
              <SelectItem
                isAdmin={isAdmin}
                task={task}
                users={users}
                onSelectChange={this.handleSelectChange}
                selectName="Performer"
              />
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
                    onClick={() => this.handleChangeTask(type)}
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
});

const mapDispatchToProps = dispatch => ({
  onFetchTask: id => dispatch(actions.fetchTask(id)),
  onChangeTask: task => dispatch(actions.changeTask(task)),
  onFetchUsers: () => dispatch(actions.fetchUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(TaskDetailed));
