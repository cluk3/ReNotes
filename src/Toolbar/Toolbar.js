import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ToolbarDiv = styled.div`
  height: 36px;
  background-color: #dcdcdc;
  color: white;
  border-bottom: #a9a9a9 solid 1px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

class Toolbar extends PureComponent {
  render() {
    return <ToolbarDiv>{this.props.children}</ToolbarDiv>;
  }
}

export default Toolbar;
