import * as actionTypes from './actionTypes';

export const openChat = user => ({
  type: actionTypes.OPEN_CHAT,
  user,
});

export const closeChat = () => ({
  type: actionTypes.CLOSE_CHAT,
});
