import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tasks: [],
  loading: false,
  currentTask: {},
  error: null,
  changing: null,
  created: false,
};

const fetchTasksStart = state => ({
  ...state,
  loading: true,
  error: null,
});

const fetchTasksFail = state => ({
  ...state,
  loading: false,
});

const changeTaskInit = (state, action) => ({
  ...state,
  changing: action.changing,
});

const changeTaskCancel = state => ({
  ...state,
  changing: null,
});

const fetchTasksSuccess = (state, action) => ({
  ...state,
  loading: false,
  tasks: action.tasks,
});

const changeTaskStart = state => ({
  ...state,
  error: null,
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
    changing: null,
  };
};

const fetchTaskStart = state => ({
  ...state,
  loading: true,
  error: null,
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
  created: false,
  error: null,
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
  created: true,
});

const addTaskCommentStart = state => ({
  ...state,
  error: null,
});

const addTaskCommentFail = (state, action) => ({
  ...state,
  error: action.error,
});

const addTaskCommentSuccess = (state, action) => ({
  ...state,
  currentTask: action.currentTask,
});

const removeTaskStart = state => ({
  ...state,
  error: null,
});

const removeTaskFail = (state, action) => ({
  ...state,
  error: action.error,
});

const removeTaskSuccess = (state, action) => {
  const newTasks = state.tasks.filter(task => task._id !== action.taskId);

  return {
    ...state,
    tasks: newTasks,
    currentTask: {},
  };
};

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
    case actionTypes.CHANGE_TASK_INIT: {
      return changeTaskInit(state, action);
    }
    case actionTypes.CHANGE_TASK_CANCEL: {
      return changeTaskCancel(state, action);
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
    case actionTypes.REMOVE_TASK_START: {
      return removeTaskStart(state, action);
    }
    case actionTypes.REMOVE_TASK_FAIL: {
      return removeTaskFail(state, action);
    }
    case actionTypes.REMOVE_TASK_SUCCESS: {
      return removeTaskSuccess(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
