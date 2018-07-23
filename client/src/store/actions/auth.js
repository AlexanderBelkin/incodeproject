import axios from '../../custom-axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = token => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  return { type: actionTypes.AUTH_LOGOUT };
};

export const auth = (authData, isRegister) => dispatch => {
  dispatch(authStart());

  let url = 'users/login';

  if (!isRegister) {
    url = 'users/register';
  }

  axios.post(URL, authData);
  axios
    .post(url, authData)
    .then(response => {
      localStorage.setItem('token', response.data.token);
      dispatch(authSuccess(response.data.token));
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
    dispatch(authSuccess(token));
  }
};
