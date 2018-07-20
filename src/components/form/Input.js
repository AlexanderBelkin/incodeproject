import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';

const Input = ({
  input,
  type,
  style,
  multiline,
  meta: { touched, error },
  Icon,
  label,
}) => (
  <TextField
    fullWidth
    label={label}
    type={type}
    style={style}
    multiline={multiline}
    helperText={touched && error}
    error={error && touched}
    InputProps={{
      startAdornment: Icon && (
        <InputAdornment position="start">
          <Icon />
        </InputAdornment>
      ),
    }}
    {...input}
  />
);

export default Input;
