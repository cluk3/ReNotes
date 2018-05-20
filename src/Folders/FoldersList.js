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
    folders: PropTypes.array.isRequired,
    activeFolder: PropTypes.string.isRequired,
    isFolderFocused: PropTypes.bool.isRequired,
    createNewFolder: PropTypes.func.isRequired,
    setActiveFolder: PropTypes.func.isRequired
  };

  componentWillUpdate(nextProps) {
    const { folders, activeFolder } = this.props;
    if (folders.length > nextProps.folders.length) {
      const folderToDeleteIndex = folders.indexOf(activeFolder);
      let newActiveFolder;
      if (folders.length === 1) {
        // it was the last in the array
        newActiveFolder = "";
      } else if (folderToDeleteIndex === folders.length - 1) {
        // it was in the last position
        newActiveFolder = folders[folderToDeleteIndex - 1];
      } else {
        newActiveFolder = folders[folderToDeleteIndex + 1];
      }
      this.props.setActiveFolder(newActiveFolder);
    }
  }

  handleFolderClick(activeFolderName) {
    this.props.activeFolder !== activeFolderName &&
      this.props.setActiveFolder(activeFolderName);
  }

  handleNewFolderClick() {
    this.setState({
      creationMode: true
    });
  }

  handleSubmit(newFolderName) {
    const success = true;
    if (this.props.folders.some(folderName => folderName === newFolderName)) {
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
    const foldersList = this.props.folders.map(folderName => (
      <Folder
        name={folderName}
        key={folderName}
        handleFolderClick={id => this.handleFolderClick(id)}
        selected={activeFolder === folderName}
        highlighted={activeFolder === folderName && isFolderFocused}
      />
    ));

    return (
      <FolderListContainer>
        <FoldersUl>{foldersList}</FoldersUl>
        {this.state.creationMode && (
          <NewFolderInput
            handleSubmit={newFolderName => this.handleSubmit(newFolderName)}
            defaultValue={getDefaultValue(folders)}
          />
        )}
        <NewFolder handleClick={() => this.handleNewFolderClick()} />
      </FolderListContainer>
    );
  }
}

function mapStateToProps({ folders, focusedElement }) {
  return {
    folders: folders.allNames,
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
