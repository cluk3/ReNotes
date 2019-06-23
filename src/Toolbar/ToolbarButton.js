import React, { PureComponent } from "react";
import styled from "styled-components";

const Button = styled.button`
  &:active {
    background-color: #dcdcdc;
    outline: none;
  }
  &:hover > svg {
    fill: #dcdcdc;
  }
  margin-right: 0.5em;
  border-radius: 0.5em;
  padding: 0.2em 1.2em;
  min-height: 2.4em;
  outline: none;
`;

export default class ToolbarButton extends PureComponent {
  render() {
    return <Button onClick={this.props.onClick}>{this.props.children}</Button>;
  }
}
