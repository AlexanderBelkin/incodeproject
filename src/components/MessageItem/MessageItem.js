import React from 'react';
import { Paper, withStyles } from '@material-ui/core';

import './style.css';

const style = {
  ownMessage: {
    float: 'right',
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: '10px',
    width: '90%',
  },
  partnerMessage: {
    float: 'left',
    backgroundColor: '#fff',
    padding: '10px',
    width: '90%',
  },
};

const Message = ({ ownMessage, classes, message }) => (
  <div className="message-container clearfix">
    <Paper className={ownMessage ? classes.ownMessage : classes.partnerMessage}>
      {message.text}
    </Paper>
  </div>
);

export default withStyles(style)(Message);
