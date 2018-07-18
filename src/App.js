import React, { Fragment, Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import UserProfile from './containers/UserProfile/UserProfile';
import Header from './components/Header/Header';
import Tasks from './containers/Tasks/Tasks';
import TaskDetailed from './containers/TaskDetailed/TaskDetailed';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount = () => {
    const { onSignIn } = this.props;
    onSignIn();
  };

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path="/profile" component={UserProfile} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/task/:id" component={TaskDetailed} />
        </Switch>
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
