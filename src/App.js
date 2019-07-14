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
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';

const commonColumnStyles = `
  display: block;
  position: relative;
  overflow: hidden;
  height: 100%;
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

const ColumnsContainer = styled(ReflexContainer)`
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '100vh' }}>
        <DndProvider backend={HTML5Backend}>
          <ColumnsContainer orientation="vertical">
            <ReflexElement flex={0.2} minSize={200}>
              <FoldersColumn>
                <Toolbar />
                <Focusable offset="68" elementType={ENTITIES.FOLDERS}>
                  <FoldersList />
                </Focusable>
              </FoldersColumn>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement
              flex={0.34}
              minSize={300}
              onStopResize={(...args) => console.log(args)}
            >
              <NotesColumn>
                <NotesToolbar />
                <Focusable offset="37" elementType={ENTITIES.NOTES}>
                  <NotesList />
                </Focusable>
              </NotesColumn>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement flex={0.46} minSize={400}>
              <EditorColumn>
                <Toolbar />
                <Focusable offset="37" elementType={ENTITIES.EDITOR}>
                  <NoteEditor />
                </Focusable>
              </EditorColumn>
            </ReflexElement>
          </ColumnsContainer>
        </DndProvider>
      </div>
    );
  }
}

export default App;
