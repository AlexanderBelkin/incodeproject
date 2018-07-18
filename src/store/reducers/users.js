import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [],
  loading: false,
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
  users: action.users,
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
    default:
      return state;
  }
};

export default reducer;
