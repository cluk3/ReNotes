import React, { PureComponent } from "react";

class Folder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
      showErrorModal: false
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
    const succeded = this.props.handleSubmit(this.state.value);
    if (!succeded) {
      this.setState({
        showErrorModal: true
      });
    }
  }

  render() {
    return (
      <div>
        <form
          onSubmit={e => this.onHandleSubmit(e)}
          style={{ position: "relative", zIndex: 110 }}
        >
          <input
            type="text"
            value={this.state.value}
            onChange={e => this.handleChange(e)}
            onFocus={e => this.handleFocus(e)}
            autoFocus
            onBlur={e => this.onHandleSubmit(e)}
            ref={input => {
              this.textInput = input;
            }}
          />
        </form>
        {this.state.showErrorModal && (
          <div
            style={{
              position: "fixed",
              zIndex: 105,
              color: "white",
              backgroundColor: "grey",
              top: "40%",
              left: "40%",
              display: "block"
            }}
          >
            <span>Name Taken</span>
            <button
              onClick={() => {
                this.setState({ showErrorModal: false });
                this.textInput.focus();
              }}
            >
              Ok
            </button>
          </div>
        )}
        <div
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 100
          }}
        />
      </div>
    );
  }
}

export default Folder;
