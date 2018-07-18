import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
  Tab,
  Grid,
  withStyles,
  Dialog,
  DialogTitle,
} from '@material-ui/core';
import { List, Person } from '@material-ui/icons';

import Tasks from '../Tasks/Tasks';
import Users from '../Users/Users';
import Chat from '../Chat/Chat';
import * as actions from '../../store/actions/index';

const style = {
  container: {
    marginTop: '25px',
  },
  tabs: {
    maxWidth: '960px',
    margin: '0 auto',
  },
};

class DashBoard extends Component {
  state = {
    value: 'users',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes, isChatOpened, onCloseChat, chatUser } = this.props;
    return (
      <Fragment>
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12}>
            <Tabs
              className={classes.tabs}
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary">
              <Tab value="tasks" icon={<List />} label="TASKS LIST" />
              <Tab value="users" icon={<Person />} label="USERS" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            {value === 'tasks' && <Tasks showAll />}
            {value === 'users' && <Users />}
          </Grid>
        </Grid>
        <Dialog open={isChatOpened} onClose={onCloseChat}>
          <DialogTitle>{chatUser.name}</DialogTitle>
          <Chat chatUser={chatUser} />
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isChatOpened: state.chat.isOpened,
  chatUser: state.chat.user,
});

const mapDispatchToProps = dispatch => ({
  onCloseChat: () => dispatch(actions.closeChat()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(DashBoard));
