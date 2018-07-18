import React, { Component } from 'react';
import { Paper, withStyles, Grid } from '@material-ui/core';

const style = {
  messageContainer: {
    margin: '0 15px',
  },
};

class Chat extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper>Chat</Paper>
      </Grid>
    );
  }
}

export default withStyles(style)(Chat);
