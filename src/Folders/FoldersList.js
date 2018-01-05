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

export class FoldersList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      creationMode: false
    };
  }

  componentWillUpdate(nextProps) {
    const { folders, activeFolder } = this.props;
    if (this.props.folders.length > nextProps.folders.length) {
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
      this.props.setItemToDelete("folder", newActiveFolder);
    }
  }

  handleFolderClick(name) {
    this.props.activeFolder !== name && this.props.setActiveFolder(name);
    this.props.setItemToDelete("folder", name);
  }

  handleNewFolderClick() {
    this.setState({
      creationMode: true
    });
  }

  handleSubmit(name, event) {
    event.preventDefault();
    if (this.props.folders.some(folderName => folderName === name)) {
      alert("name already exists");
    } else {
      this.setState({
        creationMode: false
      });
      this.props.createNewFolder(name);
      this.props.setActiveFolder(name);
      this.props.setItemToDelete("folder", name);
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
      <div style={{ maxHeight: "100%", overflowY: "auto" }}>
        Folders List
        <ul>{folders}</ul>
        {this.state.creationMode && (
          <NewFolderInput
            showInput={this.state.creationMode}
            handleSubmit={(name, event) => this.handleSubmit(name, event)}
            defaultValue={getDefaultValue(this.props.folders)}
          />
        )}
        <NewFolder handleClick={() => this.handleNewFolderClick()} />
      </div>
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
