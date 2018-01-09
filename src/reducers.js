import { combineReducers } from "redux";
import { foldersReducer } from "./Folders/FoldersActions";
import { notesReducer } from "./Notes/NotesActions";
import { deleteReducer } from "./Toolbar/DeleteActions";
import { editorReducer } from "./Editor/NoteEditorActions";

export default combineReducers({
  folders: foldersReducer,
  notes: notesReducer,
  itemToDelete: deleteReducer,
  editor: editorReducer
});
