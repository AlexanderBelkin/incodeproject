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

const Message = ({ ownMessage, classes }) => (
  <div className="message-container clearfix">
    <Paper className={ownMessage ? classes.ownMessage : classes.partnerMessage}>
      Message Message Message Messag eMessag eMessage Message Message Message
    </Paper>
  </div>
);

export default withStyles(style)(Message);
