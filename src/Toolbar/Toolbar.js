import React, { Component } from "react";
import styled from "styled-components";

const ToolbarDiv = styled.div`
  height: 16px;
  background-color: grey;
  color: white;
  padding: 8px 2px;
  border-bottom: black solid 1px;
`;
class Toolbar extends Component {
  render() {
    return <ToolbarDiv>{this.props.children}</ToolbarDiv>;
  }
}

export default Toolbar;
