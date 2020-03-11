import React, { useCallback } from 'react';
import Folder from './Folder';
import NewFolder from './NewFolder';
import NewFolderInput from './NewFolderInput';
import { connect } from 'react-redux';
import {
  createNewFolder,
  setActiveFolder,
  changeFolderName,
  endEditingName,
  moveNoteToFolder,
  deleteFolder,
  startEditingName,
  NOTES_FOLDER_ID,
  RD_FOLDER_ID
} from './modules/folders';
import { getDefaultNewFolderName } from 'helpers';
import styled from 'styled-components';
import { ENTITIES } from 'constants.js';
import PropTypes from 'prop-types';
import useContextMenu from 'react-use-context-menu';
import { ContextMenu, ContextMenuItem } from 'styled/contextMenu';

const FoldersUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const FolderListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export function FoldersList(props) {
  const {
    isFolderFocused,
    activeFolder,
    folders,
    moveNoteToFolder,
    createNewFolder,
    setActiveFolder,
    startEditingName,
    endEditingName,
    deleteFolder,
    changeFolderName
  } = props;

  const [
    bindMenu,
    bindMenuItem,
    useContextTrigger,
    { setVisible }
  ] = useContextMenu();

  const hideAndFire = handlerFn => () => {
    setVisible(false);
    handlerFn();
  };

  const [bindTrigger] = useContextTrigger({
    holdToDisplay: -1
  });

  const handleFolderClick = useCallback(
    clickedFolderId => {
      activeFolder !== clickedFolderId &&
        setActiveFolder(
          clickedFolderId,
          folders.byId[clickedFolderId].notes[0]
        );
    },
    [activeFolder, setActiveFolder, folders]
  );

  const handleDeleteFolder = useCallback(() => {
    deleteFolder(folders);
  }, [deleteFolder, folders]);

  const handleRenameFolder = useCallback(() => {
    startEditingName(activeFolder);
  }, [startEditingName, activeFolder]);

  const handleNewFolderClick = useCallback(() => {
    const defaultNewFolderName = getDefaultNewFolderName(
      folders.allIds.map(id => folders.byId[id].name)
    );
    createNewFolder(defaultNewFolderName);
  }, [createNewFolder, folders]);

  const handleSubmit = useCallback(
    (oldFolderName, newFolderName, folderId) => {
      const success = true;

      if (oldFolderName === newFolderName) {
        endEditingName();
        return success;
      }
      if (
        folders.allIds
          .map(id => ({
            ...folders.byId[id],
            id
          }))
          .some(folder => folder.name === newFolderName)
      ) {
        return !success;
      }

      changeFolderName(folderId, newFolderName);
      return success;
    },
    [endEditingName, folders, changeFolderName]
  );

  const buildFolder = (folderName, folderId) => (
    <Folder
      name={folderName}
      folderId={folderId}
      key={folderId}
      handleFolderClick={() => handleFolderClick(folderId)}
      selected={activeFolder === folderId}
      highlighted={activeFolder === folderId && isFolderFocused}
      moveNoteToFolder={moveNoteToFolder}
    />
  );

  const foldersData = folders.allIds.map(id => ({
    ...folders.byId[id],
    id
  }));

  const notesFolderData = foldersData.find(data => data.id === NOTES_FOLDER_ID);
  const recentlyDeletedFolderData = foldersData.find(
    data => data.id === RD_FOLDER_ID
  );

  const FoldersList = foldersData
    .filter(data => ![NOTES_FOLDER_ID, RD_FOLDER_ID].includes(data.id))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ id: folderId, name: folderName }) =>
      folders.editingName === folderId ? (
        <NewFolderInput
          key={folderId}
          handleSubmit={newFolderName =>
            handleSubmit(folderName, newFolderName, folderId)
          }
          defaultValue={folderName}
        />
      ) : (
        buildFolder(folderName, folderId)
      )
    )
    .concat(
      recentlyDeletedFolderData.notes.length > 0
        ? buildFolder(
            recentlyDeletedFolderData.name,
            recentlyDeletedFolderData.id
          )
        : []
    );

  FoldersList.unshift(buildFolder(notesFolderData.name, notesFolderData.id));

  const isSpecialFolder = [NOTES_FOLDER_ID, RD_FOLDER_ID].includes(
    activeFolder
  );

  return (
    <FolderListContainer>
      <FoldersUl {...bindTrigger}>{FoldersList}</FoldersUl>
      <NewFolder handleClick={handleNewFolderClick} />
      <ContextMenu {...bindMenu}>
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events */}
        <ContextMenuItem
          {...bindMenuItem}
          role="button"
          onClick={!isSpecialFolder && hideAndFire(handleRenameFolder)}
          isDisabled={isSpecialFolder}
        >
          Rename Folder...
        </ContextMenuItem>
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events */}
        <ContextMenuItem
          {...bindMenuItem}
          role="button"
          onClick={!isSpecialFolder && hideAndFire(handleDeleteFolder)}
          isDisabled={isSpecialFolder}
        >
          Delete Folder...
        </ContextMenuItem>
        <hr />
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events */}
        <ContextMenuItem
          {...bindMenuItem}
          role="button"
          onClick={hideAndFire(handleNewFolderClick)}
        >
          New Folder...
        </ContextMenuItem>
      </ContextMenu>
    </FolderListContainer>
  );
}

FoldersList.propTypes = {
  folders: PropTypes.object.isRequired,
  activeFolder: PropTypes.string,
  isFolderFocused: PropTypes.bool.isRequired,
  createNewFolder: PropTypes.func.isRequired,
  setActiveFolder: PropTypes.func.isRequired,
  changeFolderName: PropTypes.func.isRequired,
  endEditingName: PropTypes.func.isRequired,
  moveNoteToFolder: PropTypes.func.isRequired
};

function mapStateToProps({ folders, focusedElement }) {
  return {
    folders,
    activeFolder: folders.activeFolder,
    isFolderFocused: focusedElement.elementType === ENTITIES.FOLDERS
  };
}

const mapDispatchToProps = {
  createNewFolder,
  setActiveFolder,
  changeFolderName,
  endEditingName,
  moveNoteToFolder,
  deleteFolder,
  startEditingName
};

export default connect(mapStateToProps, mapDispatchToProps)(FoldersList);
