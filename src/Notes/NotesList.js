import React, { useCallback, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { setActiveNote, deleteNote } from './modules/notes';
import Note from './Note';
import { ENTITIES } from 'constants.js';
import { useTransition } from 'react-spring';

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
    activeFolderId
  } = props;
  const prevFolderId = usePrevious(activeFolderId);
  const handleNoteClick = useCallback(
    noteId => {
      noteId !== activeNote && setActiveNote(noteId);
    },
    [activeNote, setActiveNote]
  );
  const transitions = useTransition(notes, note => note.noteId, {
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

  return <NotesListContainer>{notesList}</NotesListContainer>;
};
NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  activeFolderId: PropTypes.string,
  activeNote: PropTypes.string,
  setActiveNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
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
  deleteNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesList);
