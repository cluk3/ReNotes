import React, { Component } from "react";
import Folder from "./Folder";

class FoldersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: []
    };
  }

  handleClick = () => {};

  render() {
    const folders = this.state.folders.map(({ name, id }) => (
      <Folder name key={id} handleClick />
    ));

    return <ul>{folders}</ul>;
  }
}

export default FoldersList;
