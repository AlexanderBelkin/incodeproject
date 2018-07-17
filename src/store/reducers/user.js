import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: {},
  loading: false,
  isEditing: false,
};

const fetchUsersStart = state => ({
  ...state,
  loading: true,
});

const fetchUsersFail = state => ({
  ...state,
  loading: false,
});

const fetchUsersSuccess = (state, action) => ({
  ...state,
  loading: false,
  user: action.user,
});

const editUser = state => ({
  ...state,
  isEditing: true,
});

const editUserSuccess = (state, action) => ({
  ...state,
  isEditing: false,
  user: action.user,
});

const editUserCancel = state => ({
  ...state,
  isEditing: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_START: {
      return fetchUsersStart(state, action);
    }
    case actionTypes.FETCH_USER_SUCCESS: {
      return fetchUsersSuccess(state, action);
    }
    case actionTypes.FETCH_USER_FAIL: {
      return fetchUsersFail(state, action);
    }
    case actionTypes.EDIT_USER: {
      return editUser(state, action);
    }
    case actionTypes.EDIT_USER_SUCCESS: {
      return editUserSuccess(state, action);
    }
    case actionTypes.EDIT_USER_CANCEL: {
      return editUserCancel(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
