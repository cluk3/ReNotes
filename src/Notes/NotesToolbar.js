import React, { PureComponent } from "react";
import Toolbar from "../Toolbar/Toolbar";
import DeleteButton from "../Toolbar/DeleteButton";
import NewNoteButton from "./NewNoteButton";

export default class NotesToolbar extends PureComponent {
  render() {
    return (
      <Toolbar>
        <DeleteButton />
        <NewNoteButton />
      </Toolbar>
    );
  }
}
