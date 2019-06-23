import React, { PureComponent } from "react";
import styled from "styled-components";

const NewFolderInput = styled.input.attrs({
  autoFocus: true,
  type: "text"
})`
  outline: none;
  width: 99%;
  appearance: none;
  font: 500 16px sans-serif;
  border: none;
  padding: 0;
`;

const NewFolderForm = styled.form`
  position: relative;
  z-index: 110;
  background-color: #4286f4;
  padding: 0.4em 0 0.4em 1em;
`;

const Overlay = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
`;

class Folder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFocus(event) {
    event.target.select();
  }

  showConfirmPrompt(message) {
    if (window.confirm(message)) {
      this.setState({
        value: this.props.defaultValue
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const trimmedValue = this.state.value.trim();
    if (trimmedValue === "") {
      return this.showConfirmPrompt(
        "Please choose a name. Folder name can't be blank."
      );
    }
    const succeded = this.props.handleSubmit(trimmedValue);
    if (!succeded) {
      this.showConfirmPrompt("Name Taken. Please choose a different name.");
    }
  }

  render() {
    return (
      <div>
        <NewFolderForm onSubmit={e => this.handleSubmit(e)}>
          <NewFolderInput
            type="text"
            value={this.state.value}
            onChange={e => this.handleChange(e)}
            onFocus={e => this.handleFocus(e)}
            autoFocus
            innerRef={input => {
              this.textInput = input;
            }}
          />
        </NewFolderForm>
        <Overlay onClick={e => this.handleSubmit(e)} />
      </div>
    );
  }
}

export default Folder;
