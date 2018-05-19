import React, { PureComponent } from "react";
import Folder from "./Folder";
import NewFolder from "./NewFolder";
import NewFolderInput from "./NewFolderInput";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  createNewFolder,
  deleteFolder,
  setActiveFolder
} from "./FoldersActions";
import { setItemToDelete } from "../Toolbar/DeleteActions";
import { getDefaultValue } from "../helpers";
import { ENTITIES } from "../constants";
import styled from "styled-components";

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
      this.props.setItemToDelete(ENTITIES.FOLDERS, newActiveFolder);
    }
  }

  handleFolderClick(name) {
    this.props.activeFolder !== name && this.props.setActiveFolder(name);
    this.props.setItemToDelete(ENTITIES.FOLDERS, name);
  }

  handleNewFolderClick() {
    this.setState({
      creationMode: true
    });
  }

  handleSubmit(name) {
    const success = true;
    if (this.props.folders.some(folderName => folderName === name)) {
      return !success;
    } else {
      this.setState({
        creationMode: false
      });
      this.props.createNewFolder(name);
      this.props.setActiveFolder(name);
      this.props.setItemToDelete(ENTITIES.FOLDERS, name);
      return success;
    }
  }

  render() {
    const folders = this.props.folders.map(name => (
      <Folder
        name={name}
        key={name}
        handleFolderClick={id => this.handleFolderClick(id)}
        selected={this.props.activeFolder === name}
      />
    ));

    return (
      <FolderListContainer>
        <FoldersUl>{folders}</FoldersUl>
        {this.state.creationMode && (
          <NewFolderInput
            handleSubmit={name => this.handleSubmit(name)}
            defaultValue={getDefaultValue(this.props.folders)}
          />
        )}
        <NewFolder handleClick={() => this.handleNewFolderClick()} />
      </FolderListContainer>
    );
  }
}

function mapStateToProps({ folders }) {
  return {
    folders: folders.allNames,
    activeFolder: folders.activeFolder
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewFolder: createNewFolder,
      deleteFolder: deleteFolder,
      setItemToDelete,
      setActiveFolder
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FoldersList);
