import React from 'react';
import { renderWithRedux } from './testUtils';
import App from './App';
import 'jest-styled-components';

it('renders the App', () => {
  const { container } = renderWithRedux(<App />);
  expect(container.querySelector('.App')).toBeInTheDocument();
});

test('it works', () => {
  const { container } = renderWithRedux(<App />);
  expect(container.firstChild).toMatchSnapshot();
});
