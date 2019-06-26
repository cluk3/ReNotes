import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createNewNote } from './modules/notes';
import { setFocusedElement } from '../containers/Focusable/stateManager';
import PropTypes from 'prop-types';
import { ENTITIES } from 'constants.js';
import ToolbarButton from '../Toolbar/ToolbarButton';
import PlusSvg from '../assets/Plus';

class NewNoteButton extends PureComponent {
  static propTypes = {
    activeFolderId: PropTypes.string,
    activeNote: PropTypes.string,
    createNewNote: PropTypes.func.isRequired
  };

  handleNewNoteClick() {
    this.props.createNewNote(this.props.activeFolderId);
    this.props.setFocusedElement(ENTITIES.EDITOR);
  }

  render() {
    return (
      <ToolbarButton onClick={() => this.handleNewNoteClick()}>
        <PlusSvg />
      </ToolbarButton>
    );
  }
}

function mapStateToProps({ notes, folders }) {
  return {
    activeFolderId: folders.activeFolder
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
