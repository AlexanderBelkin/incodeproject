import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (userId, isAdmin) => ({
  type: actionTypes.AUTH_SUCCESS,
  userId,
  isAdmin,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const auth = () => dispatch => {
  dispatch(authStart());

  const isAdmin = true;
  const userId = '0';

  if (true) {
    dispatch(authSuccess(userId, isAdmin));
  } else {
    dispatch(authFail('Error'));
  }
};

export const authToggle = () => ({
  type: actionTypes.AUTH_TOGGLE,
});
