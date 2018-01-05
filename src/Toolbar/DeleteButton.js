import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteFolder } from "../Folders/FoldersActions";
import { deleteNote } from "../Notes/NotesActions";

class DeleteButton extends PureComponent {
  deleteSelectedItem() {
    const { entity, id } = this.props.itemToDelete;

    if (entity === "folder") {
      if (this.props.folders.byName[id].notes.length) {
        const confirmDelete = window.confirm(
          "Deleting the folder will delete also all the note into it, are you sure?"
        );
        confirmDelete && this.props.deleteFolder(id);
      } else {
        this.props.deleteFolder(id);
      }
    } else {
      this.props.deleteNote(id, this.props.folders.activeFolder);
    }
  }
  render() {
    return <button onClick={() => this.deleteSelectedItem()}>Delete</button>;
  }
}

function mapStateToProps({ itemToDelete, folders }) {
  return {
    folders,
    itemToDelete
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
