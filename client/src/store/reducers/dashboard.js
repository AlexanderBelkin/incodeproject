import * as actionTypes from '../actions/actionTypes';

const initialState = {
  value: 'tasks',
};

const changeDashBoardTab = (state, action) => ({
  ...state,
  value: action.value,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DASHBOARD_TAB: {
      return changeDashBoardTab(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
