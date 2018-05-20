import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import PropTypes from "prop-types";
import { setActiveNote } from "./stateManager";
import Note from "./Note";
import { ENTITIES } from "../constants";

const NotesListContainer = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export class NotesList extends PureComponent {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    activeFolderName: PropTypes.string,
    activeNote: PropTypes.string,
    setActiveNote: PropTypes.func.isRequired
  };

  handleNoteClick(noteId) {
    noteId !== this.props.activeNote && this.props.setActiveNote(noteId);
  }

  componentDidUpdate(prevProps) {
    const {
      notes: notesBeforeUpdate,
      activeFolderName,
      activeNote: deletedNoteId
    } = prevProps;
    if (
      activeFolderName === this.props.activeFolderName &&
      notesBeforeUpdate.length > this.props.notes.length
    ) {
      const deletedNoteIndex = _.findIndex(
        notesBeforeUpdate,
        ({ noteId }) => noteId === deletedNoteId
      );
      let newActiveNote;
      if (notesBeforeUpdate.length === 1) {
        // it was the last in the array
        newActiveNote = "";
      } else if (deletedNoteIndex === notesBeforeUpdate.length - 1) {
        // it was in the last position
        newActiveNote = notesBeforeUpdate[deletedNoteIndex - 1];
      } else {
        newActiveNote = notesBeforeUpdate[deletedNoteIndex + 1];
      }
      this.props.setActiveNote(newActiveNote.noteId);
    } else if (activeFolderName !== this.props.activeFolderName) {
      const newActiveNoteId = this.props.notes.length
        ? this.props.notes[0].noteId
        : "";
      this.props.setActiveNote(newActiveNoteId);
    }
  }

  render() {
    const { notes, activeNote, isNoteFocused } = this.props;
    const notesList = notes.map(({ creationDate, editorState, noteId }) => {
      const isSelected = activeNote === noteId;
      return (
        <Note
          creationDate={creationDate}
          text={editorState.getCurrentContent().getPlainText()}
          key={noteId}
          handleNoteClick={() => this.handleNoteClick(noteId)}
          selected={isSelected}
          highlighted={isNoteFocused && isSelected}
        />
      );
    });
    return <NotesListContainer>{notesList}</NotesListContainer>;
  }
}

function mapStateToProps({ notes, folders, focusedElement }) {
  const activeFolder = folders.byName[folders.activeFolder];
  // right now since we recreate the notes everytime the component is re-rendered.
  // Can be solved by reselect memoization
  return {
    notes: activeFolder
      ? activeFolder.notes.map(noteId =>
          Object.assign({ noteId }, notes.byId[noteId])
        )
      : [],
    activeFolderName: folders.activeFolder,
    activeNote: notes.activeNote,
    isNoteFocused: focusedElement.elementType === ENTITIES.NOTES
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setActiveNote
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
