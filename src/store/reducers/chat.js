import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isOpened: false,
  chatRoom: {},
  error: null,
  loading: false,
};

const openChat = state => ({
  ...state,
  isOpened: true,
});

const closeChat = state => ({
  ...state,
  isOpened: false,
  userId: null,
});

const fetchChatRoomStart = state => ({
  ...state,
  loading: true,
});

const fetchChatRoomSuccess = (state, action) => ({
  ...state,
  loading: false,
  chatRoom: action.chatRoom,
});

const fetchChatRoomFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CHAT: {
      return openChat(state, action);
    }
    case actionTypes.CLOSE_CHAT: {
      return closeChat(state, action);
    }
    case actionTypes.FETCH_CHATROOM_START: {
      return fetchChatRoomStart(state, action);
    }
    case actionTypes.FETCH_CHATROOM_SUCCESS: {
      return fetchChatRoomSuccess(state, action);
    }
    case actionTypes.FETCH_CHATROOM_FAIL: {
      return fetchChatRoomFail(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
