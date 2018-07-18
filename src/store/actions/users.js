import axios from 'axios';
import * as actionTypes from './actionTypes';

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
