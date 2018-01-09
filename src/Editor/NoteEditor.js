import React, { Component } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState } from "draft-js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEditorState,
  createNewNote,
  setActiveNote
} from "../Notes/NotesActions";
import { ENTITIES } from "../constants";
import { setItemToDelete } from "../Toolbar/DeleteActions";
import { setFocusEditor } from "./NoteEditorActions";

export class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.setDomEditorRef = ref => (this.domEditor = ref);
    this.onChange = editorState =>
      this.props.updateEditorState(editorState, this.props.activeNote);
    this.onClick = () => {
      if (this.props.activeNote) {
        this.domEditor.focus();
      } else {
        const noteId = `note-${Date.now()}`;
        this.props.createNewNote(this.props.parentFolderName, noteId);
        this.props.setActiveNote(noteId);
        this.props.setItemToDelete(ENTITIES.NOTES, noteId);
        this.props.setFocusEditor(true);
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.focusEditor) {
      this.domEditor.focus();
      this.props.setFocusEditor(false);
    }
  }

  render() {
    return (
      <div
        style={{ height: "100%", maxHeight: "100%", overflowY: "auto" }}
        onClick={this.onClick}
      >
        {this.props.editorState && (
          <Editor
            editorState={this.props.editorState}
            onChange={this.onChange}
            ref={this.setDomEditorRef}
          />
        )}
      </div>
    );
  }
}

NoteEditor.propTypes = {};

function mapStateToProps({ notes, folders, editor }) {
  const { activeNote } = notes;
  return {
    editorState: activeNote ? notes.byId[notes.activeNote].editorState : null,
    activeNote,
    parentFolderName: folders.activeFolder,
    focusEditor: editor.focusEditor
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewNote,
      updateEditorState,
      setActiveNote,
      setItemToDelete,
      setFocusEditor
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);
