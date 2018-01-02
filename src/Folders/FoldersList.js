import React, { Component } from "react";
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
import { setSelectedElement } from "../Toolbar/DeleteActions";

const getDefaultValue = folders => {
  const NEW_FOLDER = "New Folder";
  if (!folders.includes(NEW_FOLDER)) return NEW_FOLDER;

  const newFolders = folders.filter(folderName =>
    folderName.startsWith(NEW_FOLDER)
  );

  let i = 1,
    found = false,
    newFolderName;

  while (i <= newFolders.length && !found) {
    newFolderName = `${NEW_FOLDER} ${i}`;
    found = !folders.includes(newFolderName);
    i++;
  }
  return newFolderName;
};

export class FoldersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      creationMode: false
    };
  }

  handleFolderClick(name) {
    this.setState({ selected: name });
    this.props.setSelectedElement("folder", name);
    this.props.setActiveFolder(name);
  }

  handleNewFolderClick() {
    this.setState({
      creationMode: true
    });
  }

  handleSubmit(name, event) {
    event.preventDefault();
    if (this.props.folders.allNames.some(folderName => folderName === name)) {
      alert("name already exists");
    } else {
      this.setState({
        selected: name,
        creationMode: false
      });
      this.props.createNewFolder(name);
      this.props.setSelectedElement("folder", name);
      this.props.setActiveFolder(name);
    }
  }

  render() {
    const folders = this.props.folders.allNames.map(name => (
      <Folder
        name={name}
        key={name}
        handleFolderClick={id => this.handleFolderClick(id)}
        selected={this.state.selected === name}
      />
    ));

    return (
      <div>
        Folders List
        <ul>{folders}</ul>
        {this.state.creationMode && (
          <NewFolderInput
            showInput={this.state.creationMode}
            handleSubmit={(name, event) => this.handleSubmit(name, event)}
            defaultValue={getDefaultValue(this.props.folders.allNames)}
          />
        )}
        <NewFolder handleClick={() => this.handleNewFolderClick()} />
      </div>
    );
  }
}

function mapStateToProps({ folders }) {
  return {
    folders
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewFolder: createNewFolder,
      deleteFolder: deleteFolder,
      setSelectedElement,
      setActiveFolder
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FoldersList);
