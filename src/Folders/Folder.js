import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const getbackgroundColor = props => {
  if (props.highlighted) {
    return '#3b90fe';
  } else if (props.selected) {
    return '#dcdee0';
  }
  return '#f3f4f5';
};

const FolderLi = styled.li`
  list-style: none;
  padding: 0.4em 0 0.4em 1em;
  background-color: ${getbackgroundColor};
`;

const Folder = ({
  name,
  handleFolderClick,
  selected,
  highlighted,
  folderId,
  moveNoteToFolder
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Note',
    canDrop: item => item.parentFolderId !== folderId,
    drop: item => moveNoteToFolder(item.id, folderId),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });
  return (
    <FolderLi
      ref={drop}
      onClick={handleFolderClick}
      onContextMenu={handleFolderClick}
      selected={selected}
      highlighted={highlighted || (canDrop && isOver)}
    >
      {name}
    </FolderLi>
  );
};

export default Folder;
