import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tasks: [],
  loading: false,
  currentTask: {
    id: '0',
    title: 'Task 1',
    description: 'Description for task 1',
    status: 'To Do',
    userId: '0',
    comments: [
      {
        userName: 'Harry Potter',
        date: '12-08-2018 15:30',
        text:
          'Description for task 4 Lorem ipsum dolor sit amet, vivendo voluptatum per an. Quod fabellas phaedrum et nam, usu et quas graeci. Te eum nemore saperet ceteros, no labore admodum ius. Adhuc minimum adipisci ea mea, ut sed debet tamquam definiebas. Ius et iudicabit accommodare. Lorem ipsum dolor sit amet, vivendo voluptatum per an. Quod fabellas phaedrum et nam, usu et quas graeci. Te eum nemore saperet ceteros, no labore admodum ius. Adhuc minimum adipisci ea mea, ut sed debet tamquam definiebas. Ius et iudicabit accommodare',
      },
      {
        userName: 'Hermione Granger',
        date: '12-08-2018 15:31',
        text:
          'Description for task 4 Lorem ipsum dolor sit amet, vivendo voluptatum per an. Quod fabellas phaedrum et nam, usu et quas graeci. Te eum nemore saperet ceteros, no labore admodum ius. Adhuc minimum adipisci ea mea, ut sed debet tamquam definiebas. Ius et iudicabit accommodare. Lorem ipsum dolor sit amet, vivendo voluptatum per an. Quod fabellas phaedrum et nam, usu et quas graeci. Te eum nemore saperet ceteros, no labore admodum ius. Adhuc minimum adipisci ea mea, ut sed debet tamquam definiebas. Ius et iudicabit accommodare',
      },
      {
        userName: 'Ron Weasley',
        date: '12-08-2018 15:32',
        text:
          'Description for task 4 Lorem ipsum dolor sit amet, vivendo voluptatum per an. Quod fabellas phaedrum et nam, usu et quas graeci. Te eum nemore saperet ceteros, no labore admodum ius. Adhuc minimum adipisci ea mea, ut sed debet tamquam definiebas. Ius et iudicabit accommodare. Lorem ipsum dolor sit amet, vivendo voluptatum per an. Quod fabellas phaedrum et nam, usu et quas graeci. Te eum nemore saperet ceteros, no labore admodum ius. Adhuc minimum adipisci ea mea, ut sed debet tamquam definiebas. Ius et iudicabit accommodare',
      },
    ],
  },
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
