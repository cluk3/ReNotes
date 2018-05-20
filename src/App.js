import React, { Component } from "react";
import "./App.css";
import FoldersList from "./Folders/FoldersList";
import NotesList from "./Notes/NotesList";
import NoteEditor from "./Editor/NoteEditor";
import styled from "styled-components";
import Toolbar from "./Toolbar/Toolbar";
import NotesToolbar from "./Notes/NotesToolbar";
import Focusable from "./containers/Focusable";
import { ENTITIES } from "./constants";

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
            <Focusable elementType={ENTITIES.FOLDERS}>
              <FoldersList />
            </Focusable>
          </FoldersColumn>
          <NotesColumn key={1}>
            <NotesToolbar />
            <Focusable elementType={ENTITIES.NOTES}>
              <NotesList />
            </Focusable>
          </NotesColumn>
          <EditorColumn key={2}>
            <Toolbar />
            <Focusable elementType={ENTITIES.EDITOR}>
              <NoteEditor />
            </Focusable>
          </EditorColumn>
        </ColumnsContainer>
      </div>
    );
  }
}

export default App;
