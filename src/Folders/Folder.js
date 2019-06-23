import React from "react";
import styled from "styled-components";

const getbackgroundColor = props => {
  if (props.highlighted) {
    return "#3b90fe";
  } else if (props.selected) {
    return "#dcdee0";
  }
  return "#f3f4f5";
};

const FolderLi = styled.li`
  list-style: none;
  padding: 0.4em 0 0.4em 1em;
  background-color: ${getbackgroundColor};
`;

const Folder = ({ name, handleFolderClick, selected, highlighted }) => {
  return (
    <FolderLi
      onClick={handleFolderClick}
      selected={selected}
      highlighted={highlighted}
    >
      {name}
    </FolderLi>
  );
}

export default Folder;
