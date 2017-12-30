import React, { Component } from "react";
import Folder from "./Folder";
import NewFolder from "./NewFolder";
import _ from "lodash";

class FoldersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: []
    };
  }

  handleFolderClick() {}

  handleNewFolderClick() {
    this.setState(prevState => ({
      folders: [...prevState.folders, { creationMode: true, id: _.uniqueId() }]
    }));
  }

  handleSubmit(name, event) {
    event.preventDefault();
    if (this.state.folders.some(folder => folder.name === name)) {
      alert("name already exists");
    } else {
      this.setState(prevState => ({
        folders: [
          ..._.dropRight(prevState.folders),
          {
            name,
            creationMode: false,
            id: _.last(prevState.folders).id
          }
        ]
      }));
    }
  }

  render() {
    const folders = this.state.folders.map(({ name, id, creationMode }) => (
      <Folder
        name={name}
        key={id}
        handleClick={() => this.handleFolderClick()}
        creationMode={creationMode}
        handleSubmit={(name, event) => this.handleSubmit(name, event)}
      />
    ));

    return (
      <div>
        <ul>{folders}</ul>
        <NewFolder handleClick={() => this.handleNewFolderClick()} />
      </div>
    );
  }
}

export default FoldersList;
