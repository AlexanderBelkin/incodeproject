import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchTasksSuccess = tasks => ({
  type: actionTypes.FETCH_TASKS_SUCCESS,
  tasks,
});

export const fetchTasksFail = error => ({
  type: actionTypes.FETCH_TASKS_FAIL,
  error,
});

export const fetchTasksStart = () => ({
  type: actionTypes.FETCH_TASKS_START,
});

export const fetchTasks = () => dispatch => {
  dispatch(fetchTasksStart());
  axios
    .get('/TaskList.json')
    .then(res => {
      dispatch(fetchTasksSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchTasksFail(error));
    });
};

export const fetchTaskSuccess = currentTask => ({
  type: actionTypes.FETCH_TASK_SUCCESS,
  currentTask,
});

export const fetchTaskFail = error => ({
  type: actionTypes.FETCH_TASK_FAIL,
  error,
});

export const fetchTaskStart = () => ({
  type: actionTypes.FETCH_TASK_START,
});

export const fetchTask = () => dispatch => {
  dispatch(fetchTaskStart());
  axios
    .get('/Task.json')
    .then(res => {
      dispatch(fetchTaskSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchTaskFail(error));
    });
};

export const changeTaskStatus = (taskId, newStatus) => ({
  type: actionTypes.CHANGE_TASK_STATUS,
  taskId,
  newStatus,
});

export const addTaskComment = comment => ({
  type: actionTypes.ADD_TASK_COMMENT,
  comment,
});
