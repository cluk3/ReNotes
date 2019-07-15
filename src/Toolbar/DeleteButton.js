import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  deleteFolder,
  NOTES_FOLDER_ID,
  RD_FOLDER_ID
} from '../Folders/modules/folders';
import { deleteNoteAndElectNewActive } from '../Notes/modules/notes';
import { ENTITIES } from 'constants.js';
import ToolbarButton from './ToolbarButton';
import { ReactComponent as Trash } from './trash.svg';
import styled from 'styled-components';

const TrashIcon = styled(Trash)`
  fill: #888889;
`;

class DeleteButton extends PureComponent {
  deleteSelectedItem() {
    const {
      folders,
      notes,
      focusedElement,
      deleteFolder,
      deleteNoteAndElectNewActive,
      isDeleteDisabled
    } = this.props;

    if (isDeleteDisabled) return;

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
        disabled={this.props.isDeleteDisabled}
      >
        <TrashIcon />
      </ToolbarButton>
    );
  }
}

function mapStateToProps({ folders, notes, focusedElement }) {
  return {
    folders,
    notes,
    focusedElement,
    isDeleteDisabled:
      ([NOTES_FOLDER_ID, RD_FOLDER_ID].includes(folders.activeFolder) &&
        focusedElement.elementType === ENTITIES.FOLDERS) ||
      (focusedElement.elementType === ENTITIES.NOTES &&
        folders.byId[folders.activeFolder].notes.length === 0)
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
