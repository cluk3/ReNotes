import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteFolder } from "../Folders/modules/folders";
import { deleteNote } from "../Notes/modules/notes";
import { ENTITIES } from "../constants";
import deleteIcon from "../assets/notes-delete-icon.png";
import ToolbarButton from "./ToolbarButton";

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
        folders.byId[folders.activeFolder].notes.length === 0;
      const confirmDelete = !isFolderEmpty
        ? window.confirm(confirmFolderDeleteMessage)
        : true;

      confirmDelete && deleteFolder(folders);
    } else {
      deleteNote(notes.activeNote, folders.activeFolder);
    }
  }
  render() {
    return (
      <ToolbarButton onClick={() => this.deleteSelectedItem()}>
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
