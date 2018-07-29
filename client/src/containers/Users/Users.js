import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import UsersView from '../../components/Users/UsersView';

class Users extends Component {
  componentDidMount() {
    const { onFetchUsers } = this.props;
    onFetchUsers();
  }

  render() {
    const { users, usersLoading } = this.props;
    if (usersLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return <UsersView users={users} />;
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  usersLoading: state.users.loading,
});

const mapDispatchToProps = dispatch => ({
  onFetchUsers: () => dispatch(actions.fetchUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
