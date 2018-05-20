import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createNewNote } from "./stateManager";
import { setFocusedElement } from "../containers/Focusable/stateManager";
import PropTypes from "prop-types";
import { ENTITIES } from "../constants";

class NewNoteButton extends PureComponent {
  static propTypes = {
    activeFolderName: PropTypes.string.isRequired,
    activeNote: PropTypes.string,
    createNewNote: PropTypes.func.isRequired
  };

  handleNewNoteClick() {
    const noteId = `note-${Date.now()}`;
    this.props.createNewNote(this.props.activeFolderName, noteId);
    this.props.setFocusedElement(ENTITIES.EDITOR);
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
      setFocusedElement
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteButton);
