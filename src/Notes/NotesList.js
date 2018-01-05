import React, { PureComponent } from "react";
import Note from "./Note";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createNewNote, setActiveNote } from "./NotesActions";
import { setItemToDelete } from "../Toolbar/DeleteActions";
import _ from "lodash";

export class NotesList extends PureComponent {
  handleNoteClick(noteId) {
    noteId !== this.props.activeNote && this.props.setActiveNote(noteId);
    this.props.setItemToDelete("note", noteId);
  }

  handleNewNoteClick() {
    const noteId = `note-${Date.now()}`;
    this.props.createNewNote(this.props.activeFolderName, noteId);
    this.props.setActiveNote(noteId);
    this.props.setItemToDelete("notes", noteId);
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
      this.props.setItemToDelete("notes", newActiveNote.noteId);
    } else if (activeFolderName !== nextProps.activeFolderName) {
      nextProps.notes.length &&
        this.props.setActiveNote(nextProps.notes[0].noteId);
    }
  }

  render() {
    const { notes } = this.props;
    const notesList = notes.map(({ creationDate, text, noteId }) => {
      return (
        <Note
          creationDate={creationDate}
          text={text}
          key={noteId}
          handleNoteClick={() => this.handleNoteClick(noteId)}
          selected={this.props.activeNote === noteId}
        />
      );
    });
    return (
      <div>
        Notes List
        {notesList}
        <button
          style={{ position: "absolute", bottom: "8px", left: "8px" }}
          onClick={() => this.handleNewNoteClick()}
        >
          + New Note
        </button>
      </div>
    );
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
      createNewNote,
      setItemToDelete,
      setActiveNote
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
