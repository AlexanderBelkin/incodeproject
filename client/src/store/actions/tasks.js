import axios from '../../custom-axios';
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
    .get('tasks')
    .then(res => {
      dispatch(fetchTasksSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchTasksFail(error.response.data));
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

export const fetchTask = id => dispatch => {
  dispatch(fetchTaskStart());
  axios
    .get(`/tasks/${id}`)
    .then(res => {
      dispatch(fetchTaskSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchTaskFail(error.response.data));
    });
};

export const changeTaskStatus = (taskId, newStatus) => ({
  type: actionTypes.CHANGE_TASK_STATUS,
  taskId,
  newStatus,
});

export const changeTaskStart = () => ({
  type: actionTypes.CHANGE_TASK_START,
});

export const changeTaskFail = error => ({
  type: actionTypes.CHANGE_TASK_FAIL,
  error,
});

export const changeTaskSuccess = task => ({
  type: actionTypes.CHANGE_TASK_SUCCESS,
  task,
});

export const changeTask = task => dispatch => {
  dispatch(changeTaskStart());
  axios
    .put(`/tasks/${task._id}`, task)
    .then(res => {
      dispatch(changeTaskSuccess(res.data));
    })
    .catch(error => {
      dispatch(changeTaskFail(error.response.data));
    });
};

export const addTaskCommentStart = () => ({
  type: actionTypes.ADD_TASK_COMMENT_START,
});

export const addTaskCommentFail = error => ({
  type: actionTypes.ADD_TASK_COMMENT_FAIL,
  error,
});

export const addTaskCommentSuccess = currentTask => ({
  type: actionTypes.ADD_TASK_COMMENT_SUCCESS,
  currentTask,
});

export const addTaskComment = (text, id) => dispatch => {
  dispatch(addTaskCommentStart());
  const newComment = {
    text,
  };

  axios
    .post(`/tasks/comment/${id}`, newComment)
    .then(res => {
      dispatch(addTaskCommentSuccess(res.data));
    })
    .catch(error => {
      dispatch(addTaskCommentFail(error.response.error));
    });
};
