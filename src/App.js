import React, { Component } from "react";
import "./App.css";
import FoldersList from "./Folders/FoldersList";
import NotesList from "./Notes/NotesList";
import Toolbar from "./Toolbar/Toolbar";

class App extends Component {
  render() {
    const paneStyle = {
      border: "2px solid blue",
      display: " block",
      margin: "8px 4px",
      padding: "8px",
      position: "relative"
    };
    return (
      <div className="App" style={{ height: "100vh" }}>
        <Toolbar />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            position: "absolute",
            top: "36px",
            bottom: 0,
            width: "100%"
          }}
        >
          <div id={0} key={0} style={paneStyle}>
            <FoldersList />
          </div>
          <div id={1} key={1} style={paneStyle}>
            <NotesList />
          </div>
          <div key={2} style={paneStyle}>
            Editor
          </div>
        </div>
      </div>
    );
  }
}

export default App;
