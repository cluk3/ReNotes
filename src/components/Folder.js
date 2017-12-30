import React from "react";

const componentName = ({ name, handleClick }) => {
  return <li onClick={handleClick}>{name}</li>;
};

export default componentName;
