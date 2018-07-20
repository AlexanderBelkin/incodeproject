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

class App extends Component {
  // componentDidMount = () => {
  //   const { onSignIn } = this.props;
  //   onSignIn();
  // };

  render() {
    const { isAuthenticated } = this.props;
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
          <Route path="/tasks" component={Tasks} />
          <Route path="/task/:id" component={TaskDetailed} />
          <Route exact path="/" component={DashBoard} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Fragment>
        <Header isAuthenticated={isAuthenticated} />
        {routes}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onSignIn: () => dispatch(actions.auth()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
