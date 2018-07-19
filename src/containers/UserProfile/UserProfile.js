/* eslint no-param-reassign: ["error", { "props": false }] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import ProfileView from '../../components/Profile/ProfileView';
import ProfileEdit from './ProfileEdit/ProfileEdit';

class UserProfile extends Component {
  componentDidMount = () => {
    const { onFetchUser } = this.props;
    onFetchUser();
  };

  handleEditSuccess = editedUser => {
    const { onEditSuccess, user } = this.props;

    editedUser.id = user.id;

    editedUser.skills = editedUser.skills.split(', ');

    onEditSuccess(editedUser);
  };

  render() {
    const {
      user,
      userLoading,
      isEditing,
      onEditUser,
      onEditCancel,
    } = this.props;

    if (userLoading) {
      return (
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return !isEditing ? (
      <ProfileView user={user} onEditUser={onEditUser} />
    ) : (
      <ProfileEdit
        user={user}
        onEditSuccess={editedUser => this.handleEditSuccess(editedUser)}
        onEditCancel={onEditCancel}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  userLoading: state.user.loading,
  isEditing: state.user.isEditing,
});

const mapDispatchToProps = dispatch => ({
  onFetchUser: () => dispatch(actions.fetchUser()),
  onEditUser: () => dispatch(actions.editUser()),
  onEditSuccess: user => dispatch(actions.editUserSuccess(user)),
  onEditCancel: () => dispatch(actions.editUserCancel()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
