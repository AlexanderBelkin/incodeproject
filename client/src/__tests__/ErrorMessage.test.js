import React from 'react';
import { shallow } from 'enzyme';
import { Paper } from '@material-ui/core';

import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<ErrorMessage />);
});

it('should render Paper', () => {
  expect(wrapped.find(Paper).length).toEqual(1);
});
