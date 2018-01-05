import React, { PureComponent } from "react";

class Folder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: "New Folder" };
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
