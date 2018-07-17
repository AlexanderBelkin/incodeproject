import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tasks: [],
  loading: false,
  currentTask: {},
};

const fetchTasksStart = state => ({
  ...state,
  loading: true,
});

const fetchTasksFail = state => ({
  ...state,
  loading: false,
});

const fetchTasksSuccess = (state, action) => ({
  ...state,
  loading: false,
  tasks: action.tasks,
});

const changeTaskStatus = (state, action) => ({
  ...state,
  tasks: action.tasks,
});

const setCurrentTask = (state, action) => ({
  ...state,
  currentTask: action.currentTask,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS_START: {
      return fetchTasksStart(state, action);
    }
    case actionTypes.FETCH_TASKS_SUCCESS: {
      return fetchTasksSuccess(state, action);
    }
    case actionTypes.FETCH_TASKS_FAIL: {
      return fetchTasksFail(state, action);
    }
    case actionTypes.CHANGE_TASK_STATUS: {
      return changeTaskStatus(state, action);
    }
    case actionTypes.SET_CURRENT_TASK: {
      return setCurrentTask(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
