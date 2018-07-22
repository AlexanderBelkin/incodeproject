import React from 'react';
import { Paper, withStyles } from '@material-ui/core';

import './style.css';

const style = {
  ownMessage: {
    float: 'right',
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: '10px',
    maxWidth: '90%',
  },
  partnerMessage: {
    float: 'left',
    backgroundColor: '#fff',
    padding: '10px',
    maxWidth: '90%',
  },
};

const Message = ({ ownMessage, classes, message }) => (
  <div className="message-container clearfix">
    <Paper className={ownMessage ? classes.ownMessage : classes.partnerMessage}>
      <p>{message.text}</p>
      <span style={{ float: 'right', fontSize: '12px' }}>{message.date}</span>
    </Paper>
  </div>
);

export default withStyles(style)(Message);
