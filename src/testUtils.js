import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { initialState as notesInitialState } from './Notes/modules/notes';
import { initialState as foldersInitialState } from './Folders/modules/folders';
import { initialState as focusedElementInitialState } from './containers/Focusable/stateManager';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

const reducer = state => state;
export const defaultInitialState = {
  folders: foldersInitialState,
  notes: notesInitialState,
  focusedElement: focusedElementInitialState
};

export const wrapWithDnD = ui => (
  <DndProvider backend={HTML5Backend}>{ui}</DndProvider>
);

export function renderWithRedux(
  ui,
  {
    initialState = defaultInitialState,
    store = createStore(reducer, initialState)
  } = {}
) {
  return {
    ...render(<Provider store={store}>{wrapWithDnD(ui)}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

export const renderWithDnD = ui =>
  render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
