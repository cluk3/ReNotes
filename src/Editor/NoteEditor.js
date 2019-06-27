import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  updateEditorState,
  createNewNote,
  setActiveNote
} from 'Notes/modules/notes';
import styled from 'styled-components';
import { ENTITIES } from 'constants.js';
import format from 'date-fns/format';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css';

const ReactQuill = React.lazy(() => import('react-quill'));

const NoteEditorContainer = styled.div`
  height: 100%;
  max-height: 100%;
  overflow: auto;
  padding: 0.5em 1em 1em 1em;
  border-left: #dedede solid 1px;
`;

const LastModified = styled.span`
  margin-bottom: 1em;
  display: block;
  text-align: center;
  color: #555;
  font-size: 14px;
  font-weight: 300;
`;

export class NoteEditor extends Component {
  static propTypes = {
    editorState: PropTypes.object,
    activeNote: PropTypes.string,
    parentFolderName: PropTypes.string,
    setActiveNote: PropTypes.func.isRequired,
    createNewNote: PropTypes.func.isRequired,
    updateEditorState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.onChange = (content, delta, source, editor) => {
      this.props.updateEditorState(
        editor.getContents(),
        editor.getText(),
        this.props.activeNote
      );
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

    if (!editorState && editorGainedFocus) {
      return createNewNote(parentFolderName);
    }
  }

  componentDidMount() {
    window.addEventListener('DOMContentLoaded', () => {
      this.setState({
        loaded: true
      });
    });
  }

  render() {
    return (
      <NoteEditorContainer>
        <LastModified>
          {this.props.lastModified &&
            format(this.props.lastModified, 'D MMMM YYYY [at] h:mm A')}
        </LastModified>
        <Suspense fallback={<div>Loading...</div>}>
          {this.state.loaded &&
            this.props.editorState && (
              <ReactQuill
                theme="snow"
                value={this.props.editorState.contents}
                onChange={this.onChange}
                modules={{ toolbar: false }}
              />
            )}
        </Suspense>
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
