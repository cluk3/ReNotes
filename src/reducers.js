import { combineReducers } from "redux";
import { foldersReducer } from "./Folders/stateManager";
import { notesReducer } from "./Notes/stateManager";
import { focusableReducer } from "./containers/Focusable/stateManager";

export default combineReducers({
  folders: foldersReducer,
  notes: notesReducer,
  focusedElement: focusableReducer
});
