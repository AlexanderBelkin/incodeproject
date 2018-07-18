import React, { Component } from 'react';
import { Tabs, Tab, Grid, withStyles } from '@material-ui/core';
import { Phone, Person } from '@material-ui/icons';

import Tasks from '../Tasks/Tasks';
import Users from '../Users/Users';

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
  state = {
    value: 'users',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={12}>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary">
            <Tab value="tasks" icon={<Phone />} label="TASKS LIST" />
            <Tab value="users" icon={<Person />} label="USERS" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {value === 'tasks' && <Tasks showAll />}
          {value === 'users' && <Users />}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(DashBoard);
