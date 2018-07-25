import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const SelectItem = ({ task, users, onSelectChange, selectName }) => (
  <FormControl>
    <InputLabel htmlFor={selectName}>{selectName}</InputLabel>
    <Select
      id={selectName}
      value={task.performerId ? task.performerId : ''}
      onChange={onSelectChange}
      style={{ minWidth: '200px', marginBottom: '20px' }}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {users
        ? users.map(user => (
            <MenuItem key={user._id} value={user._id}>
              {user.login}
            </MenuItem>
          ))
        : null}
    </Select>
  </FormControl>
);

export default SelectItem;
