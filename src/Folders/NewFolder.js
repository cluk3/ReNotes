import React from "react";

const NewFolder = ({ handleClick }) => {
  return (
    <button
      style={{ position: "absolute", bottom: "8px" }}
      onClick={handleClick}
    >
      + New Folder
    </button>
  );
};

export default NewFolder;
