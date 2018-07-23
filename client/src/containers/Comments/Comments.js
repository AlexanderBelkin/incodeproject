/* eslint no-param-reassign: ["error", { "props": false }] */

import React, { Component } from 'react';
import { reset, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  Typography,
  withStyles,
  CardContent,
  IconButton,
} from '@material-ui/core';
import { Message, Send } from '@material-ui/icons';

import Input from '../../components/form/Input';
import * as actions from '../../store/actions/index';

const style = {
  comments: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '15px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '30px',
  },
};

class Comments extends Component {
  handleAddComment = comment => {
    const { userId, onAddTaskComment } = this.props;
    comment.userName = userId;
    const date = new Date();
    const dateFormat = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    comment.date = dateFormat;
    onAddTaskComment(comment);
  };

  render() {
    const { classes, comments, handleSubmit } = this.props;
    return (
      <div className={classes.comments}>
        <Typography
          color="primary"
          variant="headline"
          className={classes.header}>
          Comments
        </Typography>
        {comments
          ? comments.map(comment => (
              <Card key={comment.date}>
                <CardHeader title={comment.userName} subheader={comment.date} />
                <CardContent>{comment.text}</CardContent>
              </Card>
            ))
          : null}
        <form
          onSubmit={handleSubmit(this.handleAddComment)}
          style={{
            width: '100%',
            marginTop: '15px',
            position: 'relative',
          }}>
          <Field
            name="text"
            component={Input}
            label="Enter Comment Text"
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

const afterSubmit = (result, dispatch) => dispatch(reset('commentForm'));

const mapStateToProps = state => ({
  userId: state.auth.userId,
  currentTask: state.tasks.currentTask,
});

const mapDispatchToProps = dispatch => ({
  onAddTaskComment: comment => dispatch(actions.addTaskComment(comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({ form: 'commentForm', onSubmitSuccess: afterSubmit })(
    withStyles(style)(Comments),
  ),
);
