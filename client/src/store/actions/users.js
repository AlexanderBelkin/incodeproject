import axios from 'axios';
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
    .get('/Users.json')
    .then(res => {
      dispatch(fetchUsersSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchUsersFail(error));
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
    .get('/User.json')
    .then(res => {
      dispatch(fetchUserSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchUserFail(error));
    });
};

export const editUser = () => ({
  type: actionTypes.EDIT_USER,
});

export const editUserSuccess = user => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  user,
});

export const editUserCancel = () => ({
  type: actionTypes.EDIT_USER_CANCEL,
});
