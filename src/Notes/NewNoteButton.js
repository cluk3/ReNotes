import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createNewNote, setActiveNote } from "./NotesActions";
import { setItemToDelete } from "../Toolbar/DeleteActions";
import { ENTITIES } from "../constants";
import { setFocusEditor } from "../Editor/NoteEditorActions";
import PropTypes from "prop-types";

class NewNoteButton extends PureComponent {
  static propTypes = {
    activeFolderName: PropTypes.string.isRequired,
    activeNote: PropTypes.string,
    setItemToDelete: PropTypes.func.isRequired,
    setActiveNote: PropTypes.func.isRequired,
    createNewNote: PropTypes.func.isRequired,
    setFocusEditor: PropTypes.func.isRequired
  };

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
