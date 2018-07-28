import React, { Fragment, Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import UserProfile from './containers/UserProfile/UserProfile';
import Header from './components/Header/Header';
import Tasks from './containers/Tasks/Tasks';
import TaskDetailed from './containers/TaskDetailed/TaskDetailed';
import * as actions from './store/actions/index';
import DashBoard from './containers/DashBoard/DashBoard';
import Auth from './containers/Auth/Auth';
import NewTaskForm from './containers/NewTaskForm/NewTaskForm';
import PrivateRoute from './utils/PrivateRoute';

class App extends Component {
  componentDidMount() {
    const { onTryToAutoSignin } = this.props;
    onTryToAutoSignin();
  }

  componentDidUpdate() {
    const { onTryToAutoSignin } = this.props;
    onTryToAutoSignin();
  }

  render() {
    const { isAuthenticated, onLogout, userId, isAdmin, login } = this.props;

    return (
      <Fragment>
        <Header
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          userId={userId}
          login={login}
          isAdmin={isAdmin}
        />
        <Switch>
          <Route path="/auth" component={Auth} />
          <PrivateRoute
            exact
            path="/profile"
            component={UserProfile}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/task/:id"
            component={TaskDetailed}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/"
            component={DashBoard}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/tasks/:id"
            component={Tasks}
            isAuthenticated={isAuthenticated}
          />
          {isAdmin && (
            <PrivateRoute
              path="/new-task"
              component={NewTaskForm}
              isAuthenticated={isAuthenticated}
            />
          )}
          {!isAuthenticated && <Redirect to="/auth" />}
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  userId: state.auth.userId,
  isAdmin: state.auth.isAdmin,
  login: state.auth.login,
});

const mapDispatchToProps = dispatch => ({
  onTryToAutoSignin: () => dispatch(actions.authCheckState()),
  onLogout: () => dispatch(actions.logout()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
