import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createNewNote, setActiveNote } from "./NotesActions";
import { setItemToDelete } from "../Toolbar/DeleteActions";
import { ENTITIES } from "../constants";
import { setFocusEditor } from "../Editor/NoteEditorActions";

class NewNoteButton extends PureComponent {
  handleNewNoteClick() {
    const noteId = `note-${Date.now()}`;
    this.props.createNewNote(this.props.activeFolderName, noteId);
    this.props.setActiveNote(noteId);
    this.props.setItemToDelete(ENTITIES.NOTES, noteId);
    this.props.setFocusEditor(true);
  }

  render() {
    return (
      <button onClick={() => this.handleNewNoteClick()}>+ New Note</button>
    );
  }
}

function mapStateToProps({ notes, folders }) {
  return {
    activeFolderName: folders.activeFolder
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewNote,
      setItemToDelete,
      setActiveNote,
      setFocusEditor
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteButton);
