import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Paper, IconButton } from '@material-ui/core';
import { Message, Send } from '@material-ui/icons';

import MessageItem from '../../components/MessageItem/MessageItem';
import Input from '../../components/form/Input';

class Chat extends Component {
  state = {
    lel: 'lel',
  };

  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Paper
          style={{
            width: '90%',
            minHeight: '300px',
            marginBottom: '25px',
            overflowY: 'scroll',
          }}>
          <MessageItem />
          <MessageItem ownMessage />
          <MessageItem ownMessage />
          <MessageItem />
          <MessageItem />
          <MessageItem />
          <MessageItem ownMessage />
          <MessageItem ownMessage />
          <MessageItem />
          <MessageItem />
          <MessageItem />
          <MessageItem ownMessage />
          <MessageItem ownMessage />
          <MessageItem />
          <MessageItem />
          <MessageItem />
          <MessageItem ownMessage />
          <MessageItem ownMessage />
          <MessageItem />
          <MessageItem />
          <MessageItem />
          <MessageItem ownMessage />
          <MessageItem ownMessage />
          <MessageItem />
          <MessageItem />
        </Paper>
        <form
          style={{
            width: '90%',
            marginBottom: '15px',
            position: 'relative',
          }}>
          <Field
            name="message"
            component={Input}
            label="Enter message"
            Icon={Message}
          />
          <IconButton
            style={{ position: 'absolute', top: '0', right: '0' }}
            type="submit"
            variant="fab"
            color="secondary"
            aria-label="Send">
            <Send />
          </IconButton>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'chatForm' })(Chat);
