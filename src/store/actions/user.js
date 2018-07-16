import axios from 'axios';
import * as actionTypes from './actionTypes';

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

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserCancel = () => ({
  type: actionTypes.EDIT_USER_CANCEL,
});
