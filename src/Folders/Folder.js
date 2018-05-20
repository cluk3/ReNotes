import React, { PureComponent } from "react";
import styled from "styled-components";

const getbackgroundColor = props => {
  if (props.highlighted) {
    return "#4286f4";
  } else if (props.selected) {
    return "#dedede";
  }
  return "#fafafa";
};

const FolderLi = styled.li`
  list-style: none;
  padding: 0.4em 0 0.4em 1em;
  background-color: ${getbackgroundColor};
`;
class Folder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: "New Folder" };
  }

  render() {
    const { name, handleFolderClick, selected, highlighted } = this.props;

    return (
      <FolderLi
        onClick={e => handleFolderClick(name)}
        selected={selected}
        highlighted={highlighted}
      >
        {name}
      </FolderLi>
    );
  }
}

export default Folder;
