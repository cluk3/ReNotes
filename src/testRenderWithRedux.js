import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { initialState as notesInitialState } from './Notes/modules/notes';
import { initialState as foldersInitialState } from './Folders/modules/folders';
import { initialState as focusedElementInitialState } from './containers/Focusable/stateManager';

const reducer = state => state;
const defaultInitialState = {
  folders: foldersInitialState,
  notes: notesInitialState,
  focusedElement: focusedElementInitialState
};

export function renderWithRedux(
  ui,
  {
    initialState = defaultInitialState,
    store = createStore(reducer, initialState)
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}
