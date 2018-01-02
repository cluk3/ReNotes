import React, { Component } from "react";

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "New Folder" };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFocus(event) {
    event.target.select();
  }

  render() {
    const { name, handleFolderClick } = this.props;

    return (
      <li
        onClick={e => handleFolderClick(name)}
        style={{
          backgroundColor: this.props.selected ? "grey" : "white"
        }}
      >
        {name}
      </li>
    );
  }
}

export default Folder;
