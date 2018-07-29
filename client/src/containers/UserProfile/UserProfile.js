/* eslint no-param-reassign: ["error", { "props": false }] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import ProfileView from '../../components/Profile/ProfileView';
import ProfileEdit from '../../components/Profile/ProfileEdit';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.handleEditUser = this.handleEditUser.bind(this);
  }

  componentDidMount() {
    const { onFetchUser } = this.props;
    onFetchUser();
  }

  handleEditUser(editedUser) {
    const { onEditUser } = this.props;

    onEditUser(editedUser);
  }

  render() {
    const {
      user,
      userLoading,
      isEditing,
      onEditUserInit,
      onEditCancel,
      userError,
    } = this.props;

    if (userLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return !isEditing ? (
      <ProfileView
        userError={userError}
        user={user}
        onEditUserInit={onEditUserInit}
      />
    ) : (
      <ProfileEdit
        user={user}
        onEditUser={this.handleEditUser}
        onEditCancel={onEditCancel}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  userLoading: state.users.loading,
  isEditing: state.users.isEditing,
  userError: state.users.error,
});

const mapDispatchToProps = dispatch => ({
  onFetchUser: () => dispatch(actions.fetchUser()),
  onEditUserInit: () => dispatch(actions.editUserInit()),
  onEditUser: user => dispatch(actions.editUser(user)),
  onEditCancel: () => dispatch(actions.editUserCancel()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
