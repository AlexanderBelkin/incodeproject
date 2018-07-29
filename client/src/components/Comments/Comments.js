import React from 'react';
import { reset, reduxForm, Field } from 'redux-form';
import moment from 'moment';
import {
  Card,
  CardHeader,
  Typography,
  withStyles,
  CardContent,
  IconButton,
} from '@material-ui/core';
import { Message, Send } from '@material-ui/icons';

import Input from '../form/Input';
import normalizeField from '../../utils/normalizeField';

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

const Comments = ({
  classes,
  comments,
  handleSubmit,
  pristine,
  onAddTaskComment,
  id,
}) => (
  <div className={classes.comments}>
    <Typography color="primary" variant="headline" className={classes.header}>
      Comments
    </Typography>
    {comments
      ? comments.map(comment => (
          <Card key={comment.date}>
            <CardHeader
              title={comment.login}
              subheader={moment(comment.date).format('HH:mm, DD.MM.YYYY')}
            />
            <CardContent>{comment.text}</CardContent>
          </Card>
        ))
      : null}
    <form
      onSubmit={handleSubmit(comment => onAddTaskComment(comment.text, id))}
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
        normalize={normalizeField}
      />
      <IconButton
        disabled={pristine}
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

const afterSubmit = (result, dispatch) => dispatch(reset('commentForm'));

export default reduxForm({ form: 'commentForm', onSubmitSuccess: afterSubmit })(
  withStyles(style)(Comments),
);
