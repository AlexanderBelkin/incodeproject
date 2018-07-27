import React from 'react';
import { mount, shallow } from 'enzyme';
import { Typography } from '@material-ui/core';

import TasksView from '../components/Tasks/TasksView';
import TaskItem from '../components/Tasks/TaskItem';

let wrapped;

beforeEach(() => {
  wrapped = mount(<TasksView tasks={[]} />);
});

afterEach(() => {
  wrapped.unmount();
});

it('should render Typography', () => {
  expect(wrapped.find(Typography).exists()).toBeTruthy();
});

it('should render TaskItem', () => {
  expect(wrapped.find(TaskItem).length).toEqual(0);
});
