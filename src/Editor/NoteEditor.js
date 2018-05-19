import React, { Component } from "react";
import PropTypes from "prop-types";
import { Editor } from "draft-js";
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
import styled from "styled-components";

const NoteEditorContainer = styled.div`
  height: 100%;
  max-height; 100%;
  overflow: auto;
  padding: 1em 1em 0 1em;
  border-left: #dedede solid 1px;
`;

export class NoteEditor extends Component {
  static propTypes = {
    editorState: PropTypes.any,
    activeNote: PropTypes.array.isRequired,
    parentFolderName: PropTypes.string.isRequired,
    focusEditor: PropTypes.any.isRequired,
    setItemToDelete: PropTypes.func.isRequired,
    setActiveNote: PropTypes.func.isRequired,
    createNewNote: PropTypes.func.isRequired,
    setFocusEditor: PropTypes.func.isRequired,
    updateEditorState: PropTypes.func.isRequired
  };

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
      <NoteEditorContainer onClick={this.onClick}>
        {this.props.editorState && (
          <Editor
            editorState={this.props.editorState}
            onChange={this.onChange}
            ref={this.setDomEditorRef}
          />
        )}
      </NoteEditorContainer>
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
