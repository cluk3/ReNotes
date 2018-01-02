import React, { Component } from "react";
import Note from "./Note";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as NotesActions from "./NotesActions";
import { setSelectedElement } from "../Toolbar/DeleteActions";

export class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      highlighted: null
    };
  }

  handleNoteClick(id) {
    this.setState({ selected: id });
    this.props.setSelectedElement("note", id);
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
          selected={this.state.selected === noteId}
        />
      );
    });
    return (
      <div>
        Notes List
        {notesList}
        <button
          style={{ position: "absolute", bottom: "8px" }}
          onClick={() => this.props.createNewNote()}
        >
          + New Note
        </button>
      </div>
    );
  }
}

function mapStateToProps({ notes, folders }) {
  const activeFolder =
    folders.byName[folders.activeFolder || folders.allNames[0]];

  return {
    notes: activeFolder
      ? activeFolder.notes.map(noteId =>
          Object.assign({ noteId }, notes.byId[noteId])
        )
      : []
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewNote: NotesActions.createNewNote,
      setSelectedElement
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
