import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const Input = ({ input, meta: { touched, error }, Icon, label }) => (
  <FormControl>
    <InputLabel htmlFor="select-multiple">Skills</InputLabel>
    <Select
      multiple
      onChange={this.handleChange}
      input={<Input id="select-multiple" />}
      MenuProps={MenuProps}>
      {names.map(name => (
        <MenuItem
          key={name}
          value={name}
          style={{
            fontWeight:
              this.state.name.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
          }}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  // <TextField
  //   fullWidth
  //   label={label}
  //   helperText={touched && error}
  //   error={error && touched}
  //   InputProps={{
  //     startAdornment: (
  //       <InputAdornment position="start">
  //         <Icon />
  //       </InputAdornment>
  //     ),
  //   }}
  //   {...input}
  // />
);

export default Input;
