import React from 'react';
import styled from 'styled-components';
import PlusSvg from 'assets/Plus';

const NewFolderButton = styled.button`
  position: absolute;
  bottom: 0;
  border: none;
  font-size: 16px;
  background-color: #f3f4f5;
  display: flex;
  align-items: center;
  padding: 0.5em 0.5em;
`;
const ButtonText = styled.span`
  padding-left: 0.3em;
`;

const NewFolder = ({ handleClick }) => {
  return (
    <NewFolderButton onClick={handleClick}>
      <PlusSvg />
      <ButtonText>New Folder</ButtonText>
    </NewFolderButton>
  );
};

export default NewFolder;
