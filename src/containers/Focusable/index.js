import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFocusedElement } from './stateManager';
import styled from 'styled-components';

const FocusableContainer = styled.div.attrs({
  tabIndex: '-1'
})`
  height: calc(100% - ${({ heightOffset }) => heightOffset}px);
  &:focus {
    outline: none;
  }
`;

export class Focusable extends PureComponent {
  handleFocus() {
    const { elementType, setFocusedElement } = this.props;
    setFocusedElement(elementType);
  }
  render() {
    return (
      <FocusableContainer
        heightOffset={this.props.offset}
        onFocus={() => this.handleFocus()}
      >
        {this.props.children}
      </FocusableContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFocusedElement
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Focusable);
