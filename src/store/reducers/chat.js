import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isOpened: false,
  user: {},
  messages: [],
};

const openChat = (state, actions) => ({
  ...state,
  isOpened: true,
  user: actions.user,
});

const closeChat = state => ({
  ...state,
  isOpened: false,
  userId: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CHAT: {
      return openChat(state, action);
    }
    case actionTypes.CLOSE_CHAT: {
      return closeChat(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
