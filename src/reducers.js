import { combineReducers } from "redux";
import { foldersReducer } from "./Folders/modules/folders";
import { notesReducer } from "./Notes/modules/notes";
import { focusableReducer } from "./containers/Focusable/stateManager";

export default combineReducers({
  folders: foldersReducer,
  notes: notesReducer,
  focusedElement: focusableReducer
});
