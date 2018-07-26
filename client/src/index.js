import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from 'connected-react-router';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import tasksReducer from './store/reducers/tasks';
import authReducer from './store/reducers/auth';
import usersReducer from './store/reducers/users';
import chatReducer from './store/reducers/chat';
import dashboardReducer from './store/reducers/dashboard';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const history = createBrowserHistory();

const rootReducer = combineReducers({
  users: usersReducer,
  form: formReducer,
  tasks: tasksReducer,
  auth: authReducer,
  chat: chatReducer,
  dashboard: dashboardReducer,
});

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
