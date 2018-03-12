import React, { Component } from "react";
import "./App.css";
import FoldersList from "./Folders/FoldersList";
import NotesList from "./Notes/NotesList";
import NoteEditor from "./Editor/NoteEditor";
import styled from "styled-components";
import Toolbar from "./Toolbar/Toolbar";
import NotesToolbar from "./Notes/NotesToolbar";

const commonColumnStyles = `
  display: block;
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
`;

const FoldersColumn = styled.div`
  ${commonColumnStyles};
`;

const NotesColumn = styled.div`
  ${commonColumnStyles};
`;

const EditorColumn = styled.div`
  ${commonColumnStyles};
`;

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: "100vh" }}>
        <ColumnsContainer>
          <FoldersColumn key={0}>
            <Toolbar />
            <FoldersList />
          </FoldersColumn>
          <NotesColumn key={1}>
            <NotesToolbar />
            <NotesList />
          </NotesColumn>
          <EditorColumn key={2}>
            <Toolbar />
            <NoteEditor />
          </EditorColumn>
        </ColumnsContainer>
      </div>
    );
  }
}

export default App;
