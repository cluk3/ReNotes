import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { deleteFolder } from '../Folders/modules/folders';
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
        <TrashIcon />
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
