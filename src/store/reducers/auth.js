import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userId: null,
  isAdmin: false,
  loading: null,
  error: null,
};

const authStart = state => ({ ...state, error: null, loading: true });

const authSuccess = (state, action) => ({
  ...state,
  userId: action.userId,
  error: null,
  loading: false,
  isAdmin: action.isAdmin,
});

const authFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false,
});

const authLogout = state => ({ ...state, userId: null });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return authStart(state, action);
    }
    case actionTypes.AUTH_SUCCESS: {
      return authSuccess(state, action);
    }
    case actionTypes.AUTH_FAIL: {
      return authFail(state, action);
    }
    case actionTypes.AUTH_LOGOUT: {
      return authLogout(state, action);
    }
    default:
      return state;
  }
};

export default reducer;