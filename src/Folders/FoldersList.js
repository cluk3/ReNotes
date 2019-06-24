import React, { PureComponent } from 'react';
import Folder from './Folder';
import NewFolder from './NewFolder';
import NewFolderInput from './NewFolderInput';
import { connect } from 'react-redux';
import {
  createNewFolder,
  setActiveFolder,
  changeFolderName,
  endEditingName
} from './modules/folders';
import { getDefaultValue } from '../helpers';
import styled from 'styled-components';
import { ENTITIES } from '../constants';
import PropTypes from 'prop-types';

const FoldersUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const FolderListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  border-right: #dedede solid 1px;
`;

export class FoldersList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      creationMode: false
    };
  }

  static propTypes = {
    folders: PropTypes.object.isRequired,
    activeFolder: PropTypes.string,
    isFolderFocused: PropTypes.bool.isRequired,
    createNewFolder: PropTypes.func.isRequired,
    setActiveFolder: PropTypes.func.isRequired
  };

  handleFolderClick(clickedFolderId) {
    const { activeFolder, setActiveFolder, folders } = this.props;

    activeFolder !== clickedFolderId &&
      setActiveFolder(clickedFolderId, folders.byId[clickedFolderId].notes[0]);
  }

  handleNewFolderClick() {
    const { folders, createNewFolder } = this.props;
    const defaultNewFolderName = getDefaultValue(
      folders.allIds.map(id => folders.byId[id].name)
    );
    createNewFolder(defaultNewFolderName);
  }

  handleSubmit(oldFolderName, newFolderName, folderId) {
    const success = true;
    const { endEditingName, folders, changeFolderName } = this.props;

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
  }

  render() {
    const { isFolderFocused, activeFolder, folders } = this.props;

    const FoldersList = folders.allIds
      .map(id => ({
        ...folders.byId[id],
        id
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(
        ({ id: folderId, name: folderName }) =>
          folders.editingName === folderId ? (
            <NewFolderInput
              key={folderId}
              handleSubmit={newFolderName =>
                this.handleSubmit(folderName, newFolderName, folderId)
              }
              defaultValue={folderName}
            />
          ) : (
            <Folder
              name={folderName}
              key={folderId}
              handleFolderClick={() => this.handleFolderClick(folderId)}
              selected={activeFolder === folderId}
              highlighted={activeFolder === folderId && isFolderFocused}
            />
          )
      );

    return (
      <FolderListContainer>
        <FoldersUl>{FoldersList}</FoldersUl>
        <NewFolder handleClick={() => this.handleNewFolderClick()} />
      </FolderListContainer>
    );
  }
}

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
  endEditingName
};

export default connect(mapStateToProps, mapDispatchToProps)(FoldersList);
