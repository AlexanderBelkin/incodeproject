import axios from 'axios';
import * as actionTypes from './actionTypes';

export const openChat = user => ({
  type: actionTypes.OPEN_CHAT,
  user,
});

export const closeChat = () => ({
  type: actionTypes.CLOSE_CHAT,
});

export const fetchChatRoomStart = () => ({
  type: actionTypes.FETCH_CHATROOM_START,
});

export const fetchChatRoomFail = error => ({
  type: actionTypes.FETCH_CHATROOM_FAIL,
  error,
});

export const fetchChatRoomSuccess = chatRoom => ({
  type: actionTypes.FETCH_CHATROOM_SUCCESS,
  chatRoom,
});

export const fetchChatRoom = () => dispatch => {
  dispatch(fetchChatRoomStart());
  axios
    .get('/Chat.json')
    .then(res => {
      dispatch(fetchChatRoomSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchChatRoomFail(error));
    });
};

export const sendMessage = message => ({
  type: actionTypes.SEND_MESSAGE,
  message,
});
