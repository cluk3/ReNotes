import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteFolder } from "../Folders/stateManager";
import { deleteNote } from "../Notes/stateManager";
import { ENTITIES } from "../constants";

const confirmFolderDeleteMessage =
  "Deleting the folder will delete also all the note into it, are you sure?";

class DeleteButton extends PureComponent {
  deleteSelectedItem() {
    const {
      folders,
      notes,
      focusedElement,
      deleteFolder,
      deleteNote
    } = this.props;

    if (focusedElement.elementType === ENTITIES.FOLDERS) {
      const isFolderEmpty =
        folders.byName[folders.activeFolder].notes.length === 0;
      const confirmDelete = !isFolderEmpty
        ? window.confirm(confirmFolderDeleteMessage)
        : true;

      confirmDelete && deleteFolder(folders.activeFolder);
    } else {
      deleteNote(notes.activeNote, folders.activeFolder);
    }
  }
  render() {
    return <button onClick={() => this.deleteSelectedItem()}>Delete</button>;
  }
}

function mapStateToProps({ folders, notes, focusedElement }) {
  return {
    folders,
    notes,
    focusedElement
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteFolder,
      deleteNote
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
