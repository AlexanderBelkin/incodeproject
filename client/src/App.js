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
import TaskCreateForm from './containers/TaskCreateForm/TaskCreateForm';

class App extends Component {
  componentDidUpdate = () => {
    const { onTryToAutoSignin } = this.props;
    onTryToAutoSignin();
  };

  render() {
    const { isAuthenticated, onLogout, userId, isAdmin } = this.props;
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/profile" component={UserProfile} />
          <Route exact path="/tasks" component={Tasks} />
          <Route path="/task/:id" component={TaskDetailed} />
          <Route exact path="/" component={DashBoard} />
          {isAdmin ? (
            <Route path="/new-task" component={TaskCreateForm} />
          ) : (
            <Route path="/tasks/:id" component={Tasks} />
          )}
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Fragment>
        <Header
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          userId={userId}
          isAdmin={isAdmin}
        />
        {routes}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  userId: state.auth.userId,
  isAdmin: state.auth.isAdmin,
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
