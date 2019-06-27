import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  &:active {
    background-color: #dcdcdc;
    outline: none;
  }
  &:hover > svg {
    fill: #dcdcdc;
  }
  ${props =>
    props.disabled
      ? `& > svg {
    fill: #dcdcdc;
  }`
      : ''} margin-right: 0.5em;
  border-radius: 0.5em;
  padding: 0.2em 1.2em;
  min-height: 2.4em;
  outline: none;
`;

export default class ToolbarButton extends PureComponent {
  render() {
    return (
      <Button
        disabled={this.props.disabled}
        aria-label={this.props.ariaLabel}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </Button>
    );
  }
}
