import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setFocusedElement } from "./stateManager";
import styled from "styled-components";

const FocusableContainer = styled.div`
  height: 100%;
`;

/*
On click/focus it should highlight the selected list element.
*/

export class Focusable extends PureComponent {
  handleClick() {
    const { focusedElementType, elementType, setFocusedElement } = this.props;
    if (focusedElementType !== elementType) {
      setFocusedElement(elementType);
    }
  }
  render() {
    return (
      <FocusableContainer onClick={() => this.handleClick()}>
        {this.props.children}
      </FocusableContainer>
    );
  }
}

function mapStateToProps({ focusedElement }) {
  return {
    focusedElementType: focusedElement.elementType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFocusedElement
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Focusable);
