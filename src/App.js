import React, { Component } from "react";
import "./App.css";
import FoldersList from "./components/FoldersList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FoldersList />
      </div>
    );
  }
}

export default App;
