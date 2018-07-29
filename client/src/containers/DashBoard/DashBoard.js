import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Grid, withStyles } from '@material-ui/core';
import { List, Person } from '@material-ui/icons';

import Tasks from '../Tasks/Tasks';
import Users from '../Users/Users';
import * as actions from '../../store/actions/index';

const style = {
  container: {
    marginTop: '25px',
  },
  tabs: {
    maxWidth: '960px',
    margin: '0 auto',
  },
};

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    const { onChangeDashBoardTab } = this.props;
    onChangeDashBoardTab(value);
  }

  render() {
    const { classes, value } = this.props;
    return (
      <Fragment>
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12}>
            <Tabs
              className={classes.tabs}
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary">
              <Tab value="tasks" icon={<List />} label="TASKS LIST" />
              <Tab value="users" icon={<Person />} label="USERS" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            {value === 'tasks' && <Tasks />}
            {value === 'users' && <Users />}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  value: state.dashboard.value,
});

const mapDispatchToProps = dispatch => ({
  onChangeDashBoardTab: value => dispatch(actions.changeDashBoardTab(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(style)(DashBoard));
