import React, { PureComponent } from "react";
import styled from "styled-components";

const ToolbarDiv = styled.div`
  height: 16px;
  background-color: #dcdcdc;
  color: white;
  padding: 8px 2px;
  border-bottom: #a9a9a9 solid 1px;
`;
class Toolbar extends PureComponent {
  render() {
    return <ToolbarDiv>{this.props.children}</ToolbarDiv>;
  }
}

export default Toolbar;
