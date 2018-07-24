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

class TaskDetailed extends Component {
  componentDidMount = () => {
    const { onFetchTask, match } = this.props;
    onFetchTask(match.params.id);
  };

  handleChangeTask = type => {
    const { task, onChangeTask } = this.props;

    const newTask = { ...task };
    newTask.status = type;

    onChangeTask(newTask);
  };

  render() {
    const { classes, task, isAdmin, taskLoading, match } = this.props;

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
              <CardActions>
                {statusTypes.map(type => (
                  <Button
                    className="button"
                    disabled={!isAdmin && type === 'Done'}
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
  task: state.tasks.currentTask,
  taskLoading: state.tasks.loading,
});

const mapDispatchToProps = dispatch => ({
  onFetchTask: id => dispatch(actions.fetchTask(id)),
  onChangeTask: task => dispatch(actions.changeTask(task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(TaskDetailed));
