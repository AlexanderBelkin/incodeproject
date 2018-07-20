import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (userId, token, isAdmin) => ({
  type: actionTypes.AUTH_SUCCESS,
  userId,
  token,
  isAdmin,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('isAdmin');
  return { type: actionTypes.AUTH_LOGOUT };
};

export const auth = (login, email, password) => dispatch => {
  dispatch(authStart());

  let authData = {
    login,
    password,
  };
  let url = 'url for loging';

  if (email) {
    authData = {
      login,
      email,
      password,
    };
    url = 'url for register';
  }

  // axios.post(URL, authData)
  axios
    .get('/Auth.json')
    .then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('isAdmin', response.data.isAdmin);
      dispatch(
        authSuccess(
          response.data.userId,
          response.data.token,
          response.data.isAdmin,
        ),
      );
    })
    .catch(error => {
      dispatch(authFail(error));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authToggle = () => ({
  type: actionTypes.AUTH_TOGGLE,
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin');
    dispatch(authSuccess(token, userId, isAdmin));
  }
};
