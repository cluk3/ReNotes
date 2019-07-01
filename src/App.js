import React, { Component } from 'react';
import './App.css';
import FoldersList from './Folders/FoldersList';
import NotesList from './Notes/NotesList';
import NoteEditor from './Editor/NoteEditor';
import styled from 'styled-components';
import Toolbar from './Toolbar/Toolbar';
import NotesToolbar from './Notes/NotesToolbar';
import Focusable from './containers/Focusable';
import { ENTITIES } from './constants';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const commonColumnStyles = `
  display: block;
  position: relative;
  overflow: hidden;
`;

const FoldersColumn = styled.div`
  ${commonColumnStyles};
  background-color: #f3f4f5;
`;

const NotesColumn = styled.div`
  ${commonColumnStyles};
  background-color: #f9f9f7;
`;

const EditorColumn = styled.div`
  ${commonColumnStyles};
  background-color: #f9f9f7;
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
      <div className="App" style={{ height: '100vh' }}>
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
      </div>
    );
  }
}

export default App;
