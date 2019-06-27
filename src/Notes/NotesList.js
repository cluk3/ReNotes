import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { setActiveNote, deleteNote } from './modules/notes';
import Note from './Note';
import { ENTITIES } from 'constants.js';

const NotesListContainer = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export class NotesList extends PureComponent {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    activeFolderId: PropTypes.string,
    activeNote: PropTypes.string,
    setActiveNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired
  };

  handleNoteClick(noteId) {
    noteId !== this.props.activeNote && this.props.setActiveNote(noteId);
  }

  render() {
    const { notes, activeNote, isNoteListFocused } = this.props;
    const notesList = notes.map(({ lastModified, editorState, noteId }) => {
      const isNoteSelected = activeNote === noteId;
      return (
        <Note
          lastModified={lastModified}
          text={editorState.text}
          key={noteId}
          handleNoteClick={() => this.handleNoteClick(noteId)}
          selected={isNoteSelected}
          highlighted={isNoteListFocused && isNoteSelected}
        />
      );
    });

    return <NotesListContainer>{notesList}</NotesListContainer>;
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
