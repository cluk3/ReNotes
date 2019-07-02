import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { deleteFolder } from '../Folders/modules/folders';
import { deleteNoteAndElectNewActive } from '../Notes/modules/notes';
import { ENTITIES } from 'constants.js';
import deleteIcon from '../assets/notes-delete-icon.png';
import ToolbarButton from './ToolbarButton';

class DeleteButton extends PureComponent {
  deleteSelectedItem() {
    const {
      folders,
      notes,
      focusedElement,
      deleteFolder,
      deleteNoteAndElectNewActive
    } = this.props;

    if (focusedElement.elementType === ENTITIES.FOLDERS) {
      deleteFolder(folders);
    } else {
      deleteNoteAndElectNewActive(notes.activeNote, folders.activeFolder);
    }
  }
  render() {
    return (
      <ToolbarButton
        ariaLabel="Delete Note or Folder"
        onClick={() => this.deleteSelectedItem()}
      >
        <img src={deleteIcon} height="18px" alt="delete" />
      </ToolbarButton>
    );
  }
}

function mapStateToProps({ folders, notes, focusedElement }) {
  return {
    folders,
    notes,
    focusedElement
  };
}

const mapDispatchToProps = {
  deleteFolder,
  deleteNoteAndElectNewActive
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteButton);
