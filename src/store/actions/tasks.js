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

export const changeTaskStatusSuccess = tasks => ({
  type: actionTypes.CHANGE_TASK_STATUS_SUCCESS,
  tasks,
});

export const changeTaskStatusFail = error => ({
  type: actionTypes.CHANGE_TASK_STATUS_SUCCESS,
  error,
});

// TODO
export const changeTaskStatus = tasks => ({
  type: actionTypes.CHANGE_TASK_STATUS,
  tasks,
});

export const setCurrentTask = currentTask => ({
  type: actionTypes.SET_CURRENT_TASK,
  currentTask,
});
