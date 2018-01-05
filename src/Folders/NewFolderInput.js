import React, { PureComponent } from "react";

class Folder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFocus(event) {
    event.target.select();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={e => handleSubmit(this.state.value, e)}>
        <input
          type="text"
          value={this.state.value}
          onChange={e => this.handleChange(e)}
          onFocus={this.handleFocus}
          autoFocus
          onBlur={e => handleSubmit(this.state.value, e)}
        />
      </form>
    );
  }
}

export default Folder;
