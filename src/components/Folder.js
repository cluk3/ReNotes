import React, { Component } from "react";

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "New Folder" };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFocus(event) {
    event.target.select();
  }

  render() {
    const { name, handleClick, creationMode, handleSubmit } = this.props;
    const content = creationMode ? (
      <form onSubmit={e => handleSubmit(this.state.value, e)}>
        <input
          type="text"
          value={this.state.value}
          onChange={e => this.handleChange(e)}
          onFocus={this.handleFocus}
          autoFocus
        />
        <button type="submit">Save</button>
      </form>
    ) : (
      <li onClick={handleClick}>{name}</li>
    );
    return content;
  }
}

export default Folder;
