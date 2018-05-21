import React from "react";
import styled from "styled-components";

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
const Plus = styled.svg`
  fill: #888889;
`;

const NewFolder = ({ handleClick }) => {
  return (
    <NewFolderButton onClick={handleClick}>
      <Plus
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width="20px"
        height="20px"
      >
        <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z" />
      </Plus>
      <ButtonText>New Folder</ButtonText>
    </NewFolderButton>
  );
};

export default NewFolder;
