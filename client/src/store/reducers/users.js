import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [],
  loading: false,
  user: {},
  isEditing: false,
  error: null,
};

// Multiple users
const fetchUsersStart = state => ({
  ...state,
  loading: true,
});

const fetchUsersFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

const fetchUsersSuccess = (state, action) => ({
  ...state,
  loading: false,
  users: action.users,
});

// Single user
const fetchUserStart = state => ({
  ...state,
  loading: true,
});

const fetchUserFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

const fetchUserSuccess = (state, action) => ({
  ...state,
  loading: false,
  user: action.user,
});

const editUserInit = state => ({
  ...state,
  isEditing: true,
});

const editUserCancel = state => ({
  ...state,
  isEditing: false,
});

const editUserFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

const editUserStart = state => ({
  ...state,
  loading: true,
});

const editUserSuccess = (state, action) => ({
  ...state,
  isEditing: false,
  user: action.user,
  error: false,
  loading: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START: {
      return fetchUsersStart(state, action);
    }
    case actionTypes.FETCH_USERS_SUCCESS: {
      return fetchUsersSuccess(state, action);
    }
    case actionTypes.FETCH_USERS_FAIL: {
      return fetchUsersFail(state, action);
    }
    case actionTypes.FETCH_USER_START: {
      return fetchUserStart(state, action);
    }
    case actionTypes.FETCH_USER_SUCCESS: {
      return fetchUserSuccess(state, action);
    }
    case actionTypes.FETCH_USER_FAIL: {
      return fetchUserFail(state, action);
    }
    case actionTypes.EDIT_USER_INIT: {
      return editUserInit(state, action);
    }
    case actionTypes.EDIT_USER_SUCCESS: {
      return editUserSuccess(state, action);
    }
    case actionTypes.EDIT_USER_CANCEL: {
      return editUserCancel(state, action);
    }
    case actionTypes.EDIT_USER_FAIL: {
      return editUserFail(state, action);
    }
    case actionTypes.EDIT_USER_START: {
      return editUserStart(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
