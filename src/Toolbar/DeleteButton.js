import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteFolder } from "../Folders/FoldersActions";
import { deleteNote } from "../Notes/NotesActions";

class DeleteButton extends Component {
  deleteSelectedItem() {
    const { entity, id } = this.props.selectedItem;

    if (entity === "folder") {
      const confirmDelete = window.confirm(
        "Deleting the folder will delete also all the note into it, are you sure?"
      );
      confirmDelete && this.props.deleteFolder(id);
    } else {
      this.props.deleteNote(id);
    }
  }
  render() {
    return <button onClick={() => this.deleteSelectedItem()}>Delete</button>;
  }
}

function mapStateToProps({ selectedItem }) {
  return {
    selectedItem
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
