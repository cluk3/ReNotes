import React, { Component } from "react";
import DeleteButton from "./DeleteButton";

class Toolbar extends Component {
  render() {
    return (
      <div
        style={{
          height: "16px",
          backgroundColor: "green",
          color: "white",
          padding: "8px",
          margin: "4px"
        }}
      >
        Toolbar
        <DeleteButton />
      </div>
    );
  }
}

export default Toolbar;
