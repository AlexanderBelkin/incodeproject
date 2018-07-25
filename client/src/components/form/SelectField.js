import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const SelectField = ({ input, label, children, users, ...custom }) => (
  <FormControl style={{ width: '100%' }}>
    <InputLabel htmlFor={label}>{label}</InputLabel>
    <Select
      {...input}
      onChange={event => input.onChange(event.target.value)}
      id={label}
      fullWidth
      {...custom}>
      <MenuItem value="">
        <em>Noone</em>
      </MenuItem>
      {users
        ? users.map(
            user =>
              !user.isAdmin ? (
                <MenuItem key={user._id} value={user._id}>
                  {user.login}
                </MenuItem>
              ) : null,
          )
        : null}
    </Select>
  </FormControl>
);

export default SelectField;
