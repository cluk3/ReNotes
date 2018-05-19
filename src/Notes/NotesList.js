import React, { PureComponent } from "react";
import Note from "./Note";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setActiveNote } from "./NotesActions";
import { setItemToDelete } from "../Toolbar/DeleteActions";
import _ from "lodash";
import PropTypes from "prop-types";
import { ENTITIES } from "../constants";
import { setFocusEditor } from "../Editor/NoteEditorActions";
import styled from "styled-components";

const NotesListContainer = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export class NotesList extends PureComponent {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    activeFolderName: PropTypes.string.isRequired,
    activeNote: PropTypes.string,
    setItemToDelete: PropTypes.func.isRequired,
    setActiveNote: PropTypes.func.isRequired
  };

  handleNoteClick(noteId) {
    noteId !== this.props.activeNote && this.props.setActiveNote(noteId);
    this.props.setItemToDelete(ENTITIES.NOTES, noteId);
  }

  componentWillUpdate(nextProps) {
    const { notes, activeFolderName, activeNote: noteToDeleteId } = this.props;
    if (
      activeFolderName === nextProps.activeFolderName &&
      this.props.notes.length > nextProps.notes.length
    ) {
      const notesInCurrentFolder = notes;
      const noteToDeleteIndex = _.findIndex(
        notesInCurrentFolder,
        ({ noteId }) => noteId === noteToDeleteId
      );
      let newActiveNote;
      if (notesInCurrentFolder.length === 1) {
        // it was the last in the array
        newActiveNote = "";
      } else if (noteToDeleteIndex === notesInCurrentFolder.length - 1) {
        // it was in the last position
        newActiveNote = notesInCurrentFolder[noteToDeleteIndex - 1];
      } else {
        newActiveNote = notesInCurrentFolder[noteToDeleteIndex + 1];
      }
      this.props.setActiveNote(newActiveNote.noteId);
      this.props.setItemToDelete(ENTITIES.NOTES, newActiveNote.noteId);
    } else if (activeFolderName !== nextProps.activeFolderName) {
      const newActiveNote = nextProps.notes.length
        ? nextProps.notes[0].noteId
        : "";
      this.props.setActiveNote(newActiveNote);
    }
  }

  render() {
    const { notes } = this.props;
    const notesList = notes.map(({ creationDate, editorState, noteId }) => {
      return (
        <Note
          creationDate={creationDate}
          text={editorState.getCurrentContent().getPlainText()}
          key={noteId}
          handleNoteClick={() => this.handleNoteClick(noteId)}
          selected={this.props.activeNote === noteId}
        />
      );
    });
    return <NotesListContainer>{notesList}</NotesListContainer>;
  }
}

function mapStateToProps({ notes, folders }) {
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
    activeNote: notes.activeNote
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setItemToDelete,
      setActiveNote,
      setFocusEditor
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
