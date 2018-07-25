import axios from '../../custom-axios';
import * as actionTypes from './actionTypes';

// Multiple users
export const fetchUsersSuccess = users => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  users,
});

export const fetchUsersFail = error => ({
  type: actionTypes.FETCH_USERS_FAIL,
  error,
});

export const fetchUsersStart = () => ({
  type: actionTypes.FETCH_USERS_START,
});

export const fetchUsers = () => dispatch => {
  dispatch(fetchUsersStart());
  axios
    .get('users')
    .then(res => {
      dispatch(fetchUsersSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchUsersFail(error.response.data));
    });
};

// Single user
export const fetchUserSuccess = user => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  user,
});

export const fetchUserFail = error => ({
  type: actionTypes.FETCH_USER_FAIL,
  error,
});

export const fetchUserStart = () => ({
  type: actionTypes.FETCH_USER_START,
});

export const fetchUser = () => dispatch => {
  dispatch(fetchUserStart());
  axios
    .get('/users/current')
    .then(res => {
      dispatch(fetchUserSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchUserFail(error.response.data));
    });
};

export const editUserInit = () => ({
  type: actionTypes.EDIT_USER_INIT,
});

export const editUserCancel = () => ({
  type: actionTypes.EDIT_USER_CANCEL,
});

export const editUserFail = error => ({
  type: actionTypes.EDIT_USER_FAIL,
  error,
});

export const editUserStart = () => ({
  type: actionTypes.EDIT_USER_START,
});

export const editUserSuccess = user => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  user,
});

export const editUser = userData => dispatch => {
  dispatch(editUserStart());
  axios
    .put('/users/profile', userData)
    .then(res => {
      dispatch(editUserSuccess(res.data));
    })
    .catch(error => {
      dispatch(editUserFail(error.response.data));
    });
};
