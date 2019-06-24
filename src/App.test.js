import React from 'react';
import { renderWithRedux } from './testRenderWithRedux'
import App from './App';
import 'jest-styled-components';

it('renders the App', () => {
  const { container } = renderWithRedux(<App />);
  expect(container.querySelector('.App')).toBeInTheDocument();
});

test('it works', () => {
    const { container } = renderWithRedux(<App />);
    expect(container.firstChild).toMatchSnapshot()
})

it('renders the folders column', () => {
    const { store, getByText } = renderWithRedux(<App />);
    console.log(store)
    expect(getByText(store.getState().folders.byId["0"].name)).toBeInTheDocument();
});