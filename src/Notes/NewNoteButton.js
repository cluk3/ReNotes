import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createNewNote } from './modules/notes';
import { setFocusedElement } from 'containers/Focusable/stateManager';
import PropTypes from 'prop-types';
import { ENTITIES } from 'constants.js';
import ToolbarButton from 'Toolbar/ToolbarButton';
import PlusSvg from 'assets/Plus';
import { isNoteEmpty } from 'helpers';

class NewNoteButton extends PureComponent {
  static propTypes = {
    activeFolderId: PropTypes.string,
    activeNote: PropTypes.string,
    createNewNote: PropTypes.func.isRequired
  };

  handleNewNoteClick() {
    if (!this.props.isActiveNoteEmpty) {
      this.props.createNewNote(this.props.activeFolderId);
      this.props.setFocusedElement(ENTITIES.EDITOR);
    }
  }

  render() {
    return (
      <ToolbarButton
        disabled={this.props.isActiveNoteEmpty}
        ariaLabel="Add new note"
        onClick={() => this.handleNewNoteClick()}
      >
        <PlusSvg />
      </ToolbarButton>
    );
  }
}

function mapStateToProps({ notes, folders }) {
  const isActiveNoteSet = !!notes.activeNote;
  const activeNoteText =
    isActiveNoteSet && notes.byId[notes.activeNote].editorState.text;
  return {
    activeFolderId: folders.activeFolder,
    isActiveNoteEmpty: isActiveNoteSet && isNoteEmpty(activeNoteText)
  };
}

const mapDispatchToProps = {
  createNewNote,
  setFocusedElement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNoteButton);
