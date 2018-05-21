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

  onHandleSubmit(event) {
    event.preventDefault();
    if (this.state.value.trim() === "") {
      const ok = window.confirm(
        "Please choose a different name. Folder name can't be blank."
      );
      return (
        !ok &&
        this.setState({
          value: this.props.defaultValue
        })
      );
    }

    const succeded = this.props.handleSubmit(this.state.value.trim());
    if (!succeded) {
      const ok = window.confirm("Name Taken. Please choose a different name.");
      !ok &&
        this.setState({
          value: this.props.defaultValue
        });
    }
  }

  render() {
    return (
      <div>
        <NewFolderForm onSubmit={e => this.onHandleSubmit(e)}>
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
        <Overlay onClick={e => this.onHandleSubmit(e)} />
      </div>
    );
  }
}

export default Folder;
