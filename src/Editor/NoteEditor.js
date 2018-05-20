import React, { Component } from "react";
import PropTypes from "prop-types";
import { Editor } from "draft-js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEditorState,
  createNewNote,
  setActiveNote
} from "../Notes/stateManager";
import styled from "styled-components";
import { ENTITIES } from "../constants";

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
    setActiveNote: PropTypes.func.isRequired,
    createNewNote: PropTypes.func.isRequired,
    updateEditorState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.setDomEditorRef = ref => (this.domEditor = ref);
    this.onChange = editorState => {
      this.props.updateEditorState(editorState, this.props.activeNote);
    };
  }

  componentDidUpdate(prevProps) {
    const {
      isEditorFocused,
      createNewNote,
      parentFolderName,
      activeNote,
      editorState
    } = this.props;
    if (!editorState) return;
    if (isEditorFocused) {
      this.domEditor.focus();
      if (!activeNote) {
        const noteId = `note-${Date.now()}`;
        createNewNote(parentFolderName, noteId);
      }
    } else {
      this.domEditor.blur();
    }
  }

  render() {
    return (
      <NoteEditorContainer>
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

function mapStateToProps({ notes, folders, focusedElement }) {
  const { activeNote } = notes;
  return {
    editorState: activeNote ? notes.byId[notes.activeNote].editorState : null,
    activeNote,
    parentFolderName: folders.activeFolder,
    isEditorFocused: focusedElement.elementType === ENTITIES.EDITOR
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewNote,
      updateEditorState,
      setActiveNote
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);
