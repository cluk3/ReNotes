import React, { Component } from "react";
import PropTypes from "prop-types";
import { Editor } from "draft-js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEditorState,
  createNewNote,
  setActiveNote
} from "../Notes/modules/notes";
import styled from "styled-components";
import { ENTITIES } from "../constants";
import { EditorState } from "draft-js";
import format from "date-fns/format";

const NoteEditorContainer = styled.div`
  height: 100%;
  max-height; 100%;
  overflow: auto;
  padding: 0.5em 1em 1em 1em;
  border-left: #dedede solid 1px;
`;

const LastModified = styled.span`
  margin-bottom: 1em;
  display: block;
  text-align: center;
  color: #9ca09f;
  font-size: 14px;
  font-weight: 300;
`;

export class NoteEditor extends Component {
  static propTypes = {
    editorState: PropTypes.any,
    activeNote: PropTypes.string,
    parentFolderName: PropTypes.string,
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
    this.handleClick = ev => {
      if (!this.domEditor.refs.editorContainer.contains(ev.target)) {
        this.props.updateEditorState(
          EditorState.moveFocusToEnd(this.props.editorState),
          this.props.activeNote
        );
      }
    };
  }

  componentDidUpdate(prevProps) {
    const {
      isEditorFocused,
      createNewNote,
      parentFolderName,
      editorState
    } = this.props;
    const editorGainedFocus = !prevProps.isEditorFocused && isEditorFocused;

    if (!editorState && editorGainedFocus) {;
      return createNewNote(parentFolderName);
    }
  }

  render() {
    return (
      <NoteEditorContainer onClick={this.handleClick}>
        <LastModified>
          {this.props.lastModified && format(this.props.lastModified, "D MMMM YYYY [at] h:mm A")}
        </LastModified>
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

function mapStateToProps({ notes, folders, focusedElement }) {
  const { activeNote } = notes;
  const note = notes.byId[notes.activeNote];
  return {
    editorState: activeNote ? note.editorState : null,
    activeNote,
    lastModified: note && note.lastModified,
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
