import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tasks: [],
  loading: false,
  currentTask: {},
  error: null,
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

const changeTaskStart = state => ({
  ...state,
});

const changeTaskFail = (state, action) => ({
  ...state,
  error: action.error,
});

const changeTaskSuccess = (state, action) => {
  const newTasks = state.tasks.map(task => {
    if (task._id === action.task._id) return action.task;
    return task;
  });

  return {
    ...state,
    tasks: newTasks,
    currentTask: action.task,
  };
};

const fetchTaskStart = state => ({
  ...state,
  loading: true,
});

const fetchTaskFail = state => ({
  ...state,
  loading: false,
});

const fetchTaskSuccess = (state, action) => ({
  ...state,
  loading: false,
  currentTask: action.currentTask,
});

const createTaskStart = state => ({
  ...state,
  loading: true,
});

const createTaskFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

const createTaskSuccess = (state, action) => ({
  ...state,
  loading: false,
  currentTask: action.currentTask,
});

const addTaskCommentStart = state => ({
  ...state,
});

const addTaskCommentFail = (state, action) => ({
  ...state,
  error: action.error,
});

const addTaskCommentSuccess = (state, action) => ({
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
    case actionTypes.CHANGE_TASK_START: {
      return changeTaskStart(state, action);
    }
    case actionTypes.CHANGE_TASK_FAIL: {
      return changeTaskFail(state, action);
    }
    case actionTypes.CHANGE_TASK_SUCCESS: {
      return changeTaskSuccess(state, action);
    }
    case actionTypes.FETCH_TASK_START: {
      return fetchTaskStart(state, action);
    }
    case actionTypes.FETCH_TASK_SUCCESS: {
      return fetchTaskSuccess(state, action);
    }
    case actionTypes.FETCH_TASK_FAIL: {
      return fetchTaskFail(state, action);
    }
    case actionTypes.CREATE_TASK_START: {
      return createTaskStart(state, action);
    }
    case actionTypes.CREATE_TASK_FAIL: {
      return createTaskFail(state, action);
    }
    case actionTypes.CREATE_TASK_SUCCESS: {
      return createTaskSuccess(state, action);
    }
    case actionTypes.ADD_TASK_COMMENT_START: {
      return addTaskCommentStart(state, action);
    }
    case actionTypes.ADD_TASK_COMMENT_FAIL: {
      return addTaskCommentFail(state, action);
    }
    case actionTypes.ADD_TASK_COMMENT_SUCCESS: {
      return addTaskCommentSuccess(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
