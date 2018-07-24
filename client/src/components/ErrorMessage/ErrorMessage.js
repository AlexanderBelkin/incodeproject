import React from 'react';
import { Paper } from '@material-ui/core';

const ErrorMessage = ({ error }) => (
  <Paper
    style={{
      border: '#ef9a9a 1px solid',
      backgroundColor: 'rgba(244,67,54,0.2)',
      padding: '20px',
      textAlign: 'center',
      color: '#b71c1c',
      fontSize: '18px',
    }}>
    {error}
  </Paper>
);

export default ErrorMessage;
