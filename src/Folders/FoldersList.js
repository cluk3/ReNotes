import React, { PureComponent } from "react";
import Folder from "./Folder";
import NewFolder from "./NewFolder";
import NewFolderInput from "./NewFolderInput";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createNewFolder, setActiveFolder } from "./stateManager";
import { getDefaultValue } from "../helpers";
import styled from "styled-components";
import { ENTITIES } from "../constants";
import PropTypes from "prop-types";

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

  componentDidUpdate(prevProps) {
    const prevActiveFolder = prevProps.activeFolder;
    const prevFoldersNames = prevProps.folders.allNames;
    if (prevFoldersNames.length > this.props.folders.allNames.length) {
      const folderToDeleteIndex = prevFoldersNames.indexOf(prevActiveFolder);
      let newActiveFolder;
      if (prevFoldersNames.length === 1) {
        // it was the last in the array
        newActiveFolder = "";
      } else if (folderToDeleteIndex === prevFoldersNames.length - 1) {
        // it was in the last position
        newActiveFolder = prevFoldersNames[folderToDeleteIndex - 1];
      } else {
        newActiveFolder = prevFoldersNames[folderToDeleteIndex + 1];
      }
      this.props.setActiveFolder(
        newActiveFolder,
        this.props.folders.byName[newActiveFolder].notes[0]
      );
    }
  }

  handleFolderClick(clickedFolderName) {
    const { activeFolder, setActiveFolder, folders } = this.props;

    activeFolder !== clickedFolderName &&
      setActiveFolder(
        clickedFolderName,
        folders.byName[clickedFolderName].notes[0]
      );
  }

  handleNewFolderClick() {
    this.setState({
      creationMode: true
    });
  }

  handleSubmit(newFolderName) {
    const success = true;
    if (
      this.props.folders.allNames.some(
        folderName => folderName === newFolderName
      )
    ) {
      return !success;
    } else {
      this.setState({
        creationMode: false
      });
      this.props.createNewFolder(newFolderName);
      return success;
    }
  }

  render() {
    const { isFolderFocused, activeFolder, folders } = this.props;
    let foldersList;

    if (this.state.creationMode) {
      const defaultNewFolderName = getDefaultValue(folders.allNames);
      foldersList = folders.allNames
        .concat(defaultNewFolderName)
        .sort((a, b) => a.localeCompare(b))
        .map(
          folderName =>
            defaultNewFolderName === folderName ? (
              <NewFolderInput
                key={defaultNewFolderName}
                handleSubmit={newFolderName => this.handleSubmit(newFolderName)}
                defaultValue={defaultNewFolderName}
              />
            ) : (
              <Folder
                name={folderName}
                key={folderName}
                handleFolderClick={id => this.handleFolderClick(id)}
                selected={false}
                highlighted={false}
              />
            )
        );
    } else {
      foldersList = folders.allNames
        .sort((a, b) => a.localeCompare(b))
        .map(folderName => (
          <Folder
            name={folderName}
            key={folderName}
            handleFolderClick={id => this.handleFolderClick(id)}
            selected={activeFolder === folderName}
            highlighted={activeFolder === folderName && isFolderFocused}
          />
        ));
    }

    return (
      <FolderListContainer>
        <FoldersUl>{foldersList}</FoldersUl>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewFolder,
      setActiveFolder
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FoldersList);
