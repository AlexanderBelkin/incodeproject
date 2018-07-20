import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, reduxForm, Field } from 'redux-form';
import { Paper, IconButton, CircularProgress } from '@material-ui/core';
import { Message, Send } from '@material-ui/icons';

import MessageItem from '../../components/MessageItem/MessageItem';
import Input from '../../components/form/Input';
import * as actions from '../../store/actions/index';
import './style.css';

class Chat extends Component {
  componentDidMount = () => {
    const { onFetchChatRoom } = this.props;
    onFetchChatRoom();
    this.scrollToBottom();
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  };

  handleSendMessage = message => {
    const { onSendMessage, userId } = this.props;
    const newMessage = {};
    const date = new Date();

    newMessage.id = Date.now();
    newMessage.authorId = userId;
    newMessage.text = message.message;
    newMessage.date = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    onSendMessage(newMessage);
  };

  render() {
    const { chatRoom, chatLoading, userId, handleSubmit } = this.props;

    if (chatLoading) {
      return (
        <div
          style={{
            margin: '100px auto',
            textAlign: 'center',
          }}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return (
      <div className="chatContaier">
        <Paper
          style={{
            width: '90%',
            minHeight: '300px',
            marginBottom: '25px',
            overflowY: 'scroll',
          }}>
          {chatRoom.messages
            ? chatRoom.messages.map(message => (
                <MessageItem
                  key={message.id}
                  ownMessage={message.authorId === userId}
                  message={message}
                />
              ))
            : ''}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </Paper>
        <form
          onSubmit={handleSubmit(this.handleSendMessage)}
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
            multiline
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

const afterSubmit = (result, dispatch) => dispatch(reset('chatForm'));

const mapStateToProps = state => ({
  chatLoading: state.chat.loading,
  chatRoom: state.chat.chatRoom,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchChatRoom: () => dispatch(actions.fetchChatRoom()),
  onSendMessage: message => dispatch(actions.sendMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({ form: 'chatForm', onSubmitSuccess: afterSubmit })(Chat));
