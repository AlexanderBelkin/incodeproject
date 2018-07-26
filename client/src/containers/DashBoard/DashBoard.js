import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
  Tab,
  Grid,
  withStyles,
  Dialog,
  DialogTitle,
  IconButton,
  withMobileDialog,
} from '@material-ui/core';
import { List, Person, Close } from '@material-ui/icons';

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
  handleChange = (event, value) => {
    const { onChangeDashBoardTab } = this.props;
    onChangeDashBoardTab(value);
  };

  render() {
    const {
      classes,
      isChatOpened,
      onCloseChat,
      fullScreen,
      chatUser,
      value,
    } = this.props;
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
            {value === 'tasks' && <Tasks />}
            {value === 'users' && <Users />}
          </Grid>
        </Grid>
        <Dialog
          open={isChatOpened}
          onClose={onCloseChat}
          fullScreen={fullScreen}>
          <DialogTitle>Chat with {chatUser.name}</DialogTitle>
          {fullScreen ? (
            <IconButton
              onClick={onCloseChat}
              component="span"
              style={{ position: 'absolute', top: '5px', right: '5px' }}>
              <Close />
            </IconButton>
          ) : null}
          <Chat />
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isChatOpened: state.chat.isOpened,
  chatUser: state.chat.user,
  value: state.dashboard.value,
});

const mapDispatchToProps = dispatch => ({
  onCloseChat: () => dispatch(actions.closeChat()),
  onChangeDashBoardTab: value => dispatch(actions.changeDashBoardTab(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withMobileDialog()(withStyles(style)(DashBoard)));
