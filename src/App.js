import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import UserProfile from './containers/UserProfile/UserProfile';
import Header from './components/Header/Header';

const App = () => (
  <Fragment>
    <Header />
    <Route path="/profile" component={UserProfile} />
  </Fragment>
);

export default App;
