import jwtDecode from 'jwt-decode';

import axios from '../../custom-axios';
import * as actionTypes from './actionTypes';
import setAuthToken from '../../utils/setAuthToken';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, isAdmin, login, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  isAdmin,
  login,
  userId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  // remove auth header for future requests
  setAuthToken(false);
  return { type: actionTypes.AUTH_LOGOUT };
};

export const auth = (authData, isRegister) => dispatch => {
  dispatch(authStart());

  let url = 'users/login';

  if (!isRegister) {
    url = 'users/register';
  }

  axios
    .post(url, authData)
    .then(response => {
      const { token } = response.data;

      // save token to local storage
      localStorage.setItem('token', token);
      // set token to Auth header
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwtDecode(token);

      dispatch(authSuccess(token, decoded.isAdmin, decoded.login, decoded.id));
    })
    .catch(error => {
      dispatch(authFail(error.response.data));
    });
};

export const authToggle = () => ({
  type: actionTypes.AUTH_TOGGLE,
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    // save token to local storage
    localStorage.setItem('token', token);

    // decode token to get user data
    const decoded = jwtDecode(token);

    // check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // lougout user
      dispatch(logout());
    } else {
      // set token to Auth header
      setAuthToken(token);

      dispatch(authSuccess(token, decoded.isAdmin, decoded.login, decoded.id));
    }
  }
};
