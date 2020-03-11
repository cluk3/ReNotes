import React, { useCallback, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  setActiveNote,
  deleteNoteAndElectNewActive,
  createNewNote
} from './modules/notes';
import Note from './Note';
import { ENTITIES } from 'constants.js';
import { useTransition } from 'react-spring';
import useContextMenu from 'react-use-context-menu';
import { ContextMenu, ContextMenuItem } from 'styled/contextMenu';
import { Flipper } from 'react-flip-toolkit';

const NotesListContainer = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

// TODO: find a better way...
const HARDCODED_NOTE_HEIGHT = 66;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export const NotesList = props => {
  const {
    notes,
    activeNote,
    isNoteListFocused,
    setActiveNote,
    activeFolderId,
    createNewNote,
    deleteNoteAndElectNewActive
  } = props;

  const [
    bindMenu,
    bindMenuItem,
    useContextTrigger,
    { setVisible }
  ] = useContextMenu();

  const hideAndFire = handlerFn => () => {
    setVisible(false);
    handlerFn();
  };

  const [bindTrigger] = useContextTrigger({ holdToDisplay: -1 });

  const prevFolderId = usePrevious(activeFolderId);
  const handleNoteClick = useCallback(
    noteId => {
      noteId !== activeNote && setActiveNote(noteId);
    },
    [activeNote, setActiveNote]
  );
  const handleDeleteNote = useCallback(
    () => deleteNoteAndElectNewActive(activeNote),
    [activeNote, deleteNoteAndElectNewActive]
  );
  const handleNewNoteClick = useCallback(() => createNewNote(activeFolderId), [
    activeFolderId,
    createNewNote
  ]);

  const sortedNotes = notes.sort((b, a) => a.lastModified - b.lastModified);

  const transitions = useTransition(sortedNotes, note => note.noteId, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: HARDCODED_NOTE_HEIGHT },
    leave: { opacity: 0, height: 0 },
    immediate: prevFolderId !== activeFolderId
  });
  const notesList = transitions.map(({ item, props, key }) => {
    const { lastModified, editorState, noteId, parentFolderId } = item;
    const isNoteSelected = activeNote === noteId;
    return (
      <Note
        key={key}
        style={props}
        lastModified={lastModified}
        text={editorState.text}
        noteId={noteId}
        parentFolderId={parentFolderId}
        handleNoteClick={() => handleNoteClick(noteId)}
        selected={isNoteSelected}
        highlighted={isNoteListFocused && isNoteSelected}
      />
    );
  });

  return (
    <>
      <Flipper
        flipKey={sortedNotes.map(x => x.noteId).join('')}
        staggerConfig={{
          default: {
            speed: 0.8
          }
        }}
      >
        <NotesListContainer {...bindTrigger}>{notesList}</NotesListContainer>
      </Flipper>
      <ContextMenu {...bindMenu}>
        <ContextMenuItem
          {...bindMenuItem}
          onClick={hideAndFire(handleDeleteNote)}
        >
          Delete
        </ContextMenuItem>
        <ContextMenuItem {...bindMenuItem} onClick={() => {}}>
          Pin Note
        </ContextMenuItem>
        <hr />
        <ContextMenuItem
          {...bindMenuItem}
          onClick={hideAndFire(handleNewNoteClick)}
        >
          New Note
        </ContextMenuItem>
      </ContextMenu>
    </>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  activeFolderId: PropTypes.string,
  activeNote: PropTypes.string,
  setActiveNote: PropTypes.func.isRequired,
  deleteNoteAndElectNewActive: PropTypes.func.isRequired
};

function mapStateToProps({ notes, folders, focusedElement }) {
  const activeFolder = folders.byId[folders.activeFolder];
  // right now since we recreate the notes everytime the component is re-rendered.
  // Can be solved by reselect memoization
  return {
    notes: activeFolder
      ? activeFolder.notes.map(noteId =>
          Object.assign({ noteId }, notes.byId[noteId])
        )
      : [],
    activeFolderId: folders.activeFolder,
    activeNote: notes.activeNote,
    isNoteListFocused: focusedElement.elementType === ENTITIES.NOTES
  };
}

const mapDispatchToProps = {
  setActiveNote,
  deleteNoteAndElectNewActive,
  createNewNote
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
