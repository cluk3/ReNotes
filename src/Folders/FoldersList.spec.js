import React from 'react';
import { renderWithRedux } from '../testRenderWithRedux';
import FoldersList from './FoldersList';
import 'jest-styled-components';

test('it works', () => {
  const { container } = renderWithRedux(<FoldersList />);
  expect(container.firstChild).toMatchSnapshot();
});
