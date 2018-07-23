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

// TODO: change the way of changing task status
const changeTaskStatus = (state, action) => {
  const newTasks = state.tasks.map(task => {
    if (task.id === action.taskId)
      return Object.assign({}, task, { status: action.newStatus });
    return task;
  });

  let newCurrentTask = state.currentTask;

  if (state.currentTask.id === action.taskId) {
    newCurrentTask = Object.assign({}, state.currentTask, {
      status: action.newStatus,
    });
  }
  return {
    ...state,
    tasks: newTasks,
    currentTask: newCurrentTask,
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

const addTaskComment = (state, action) => {
  // immutable copiyng current object
  const newCurrentTask = JSON.parse(JSON.stringify(state.currentTask));
  newCurrentTask.comments.push(action.comment);
  return {
    ...state,
    currentTask: newCurrentTask,
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
    case actionTypes.FETCH_TASK_START: {
      return fetchTaskStart(state, action);
    }
    case actionTypes.FETCH_TASK_SUCCESS: {
      return fetchTaskSuccess(state, action);
    }
    case actionTypes.FETCH_TASK_FAIL: {
      return fetchTaskFail(state, action);
    }
    case actionTypes.CHANGE_TASK_STATUS: {
      return changeTaskStatus(state, action);
    }
    case actionTypes.ADD_TASK_COMMENT: {
      return addTaskComment(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
