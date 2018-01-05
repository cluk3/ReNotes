import { combineReducers } from "redux";
import { foldersReducer } from "./Folders/FoldersActions";
import { notesReducer } from "./Notes/NotesActions";
import { deleteReducer } from "./Toolbar/DeleteActions";

export default combineReducers({
  folders: foldersReducer,
  notes: notesReducer,
  itemToDelete: deleteReducer
});
