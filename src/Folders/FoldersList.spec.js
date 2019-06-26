import React from 'react';
import { renderWithRedux, defaultInitialState } from 'testUtils';
import FoldersListContainer from './FoldersList';
import 'jest-styled-components';
import values from 'lodash/values';
import { produce } from 'immer';

describe('FoldersList', () => {
  it('works', () => {
    const { container } = renderWithRedux(<FoldersListContainer />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders all the folders in the state', () => {
    const { store, getByText } = renderWithRedux(<FoldersListContainer />);

    values(store.getState().folders.byId).forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });
  it('contains New Folder button', () => {
    const { getByText } = renderWithRedux(<FoldersListContainer />);
    expect(getByText('New Folder')).toBeInTheDocument();
  });

  it('renders an input for modifying a folder when it is in edit mode', () => {
    const initialState = produce(defaultInitialState, draft => {
      draft.folders.editingName = draft.folders.allIds[0];
    });
    const { container, getByLabelText } = renderWithRedux(
      <FoldersListContainer />,
      {
        initialState
      }
    );

    expect(container.firstChild).toMatchSnapshot();

    expect(getByLabelText('Edit folder name')).toBeInTheDocument();
  });
});
