import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import UserProfile from './containers/UserProfile/UserProfile';
import Header from './components/Header/Header';
import Tasks from './containers/Tasks/Tasks';

const App = () => (
  <Fragment>
    <Header />
    <Route path="/profile" component={UserProfile} />
    <Route path="/tasks" component={Tasks} />
  </Fragment>
);

export default App;
