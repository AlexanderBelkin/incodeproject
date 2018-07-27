import { push } from 'connected-react-router';
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

export const fetchTasks = userId => dispatch => {
  dispatch(fetchTasksStart());
  let url = 'tasks';
  if (userId) {
    url = `tasks/user/${userId}`;
  }
  axios
    .get(url)
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
      dispatch(push('/'));
      dispatch(fetchTaskFail(error.response.data));
    });
};

export const changeTaskInit = changing => ({
  type: actionTypes.CHANGE_TASK_INIT,
  changing,
});

export const changeTaskCancel = () => ({
  type: actionTypes.CHANGE_TASK_CANCEL,
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

export const createTaskStart = () => ({
  type: actionTypes.CREATE_TASK_START,
});

export const createTaskFail = error => ({
  type: actionTypes.CREATE_TASK_FAIL,
  error,
});

export const createTaskSuccess = currentTask => ({
  type: actionTypes.CREATE_TASK_SUCCESS,
  currentTask,
});

export const createTask = task => dispatch => {
  dispatch(createTaskStart());

  axios
    .post('tasks', task)
    .then(res => {
      dispatch(createTaskSuccess(res.data));
      dispatch(push(`/task/${res.data._id}`));
    })
    .catch(error => {
      dispatch(createTaskFail(error.response.error));
    });
};

export const removeTaskStart = () => ({
  type: actionTypes.REMOVE_TASK_START,
});

export const removeTaskFail = error => ({
  type: actionTypes.REMOVE_TASK_FAIL,
  error,
});

export const removeTaskSuccess = taskId => ({
  type: actionTypes.REMOVE_TASK_SUCCESS,
  taskId,
});

export const removeTask = taskId => dispatch => {
  dispatch(removeTaskStart());

  axios
    .delete(`tasks/${taskId}`)
    .then(() => {
      dispatch(removeTaskSuccess(taskId));
      dispatch(push('/'));
    })
    .catch(error => {
      dispatch(removeTaskFail(error.response.error));
    });
};
