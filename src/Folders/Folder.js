import React, { PureComponent } from "react";
import styled from "styled-components";

const FolderLi = styled.li`
  list-style: none;
  padding: 0.4em 0 0.4em 1em;
  background-color: ${props => (props.selected ? "#dedede" : "#fafafa")};
`;
class Folder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: "New Folder" };
  }

  render() {
    const { name, handleFolderClick, selected } = this.props;

    return (
      <FolderLi onClick={e => handleFolderClick(name)} selected={selected}>
        {name}
      </FolderLi>
    );
  }
}

export default Folder;
