import React from 'react';
import { renderWithRedux } from '../testUtils';
import Toolbar from './Toolbar';
import 'jest-styled-components';

test('it works', () => {
  const { container } = renderWithRedux(<Toolbar />);
  expect(container.firstChild).toMatchSnapshot();
});
