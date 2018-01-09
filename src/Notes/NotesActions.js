import _ from "lodash";
import { EditorState, ContentState } from "draft-js";

export const CREATE_NEW_NOTE = "CREATE_NEW_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const SET_ACTIVE_NOTE = "SET_ACTIVE_NOTE";
export const UPDATE_EDITOR_STATE = "UPDATE_EDITOR_STATE";

export function createNewNote(parentFolderName, noteId, editorState) {
  return {
    type: CREATE_NEW_NOTE,
    payload: {
      noteId,
      parentFolderName,
      editorState: editorState || EditorState.createEmpty()
    }
  };
}

export function updateEditorState(editorState, noteId) {
  return {
    type: UPDATE_EDITOR_STATE,
    payload: {
      noteId,
      editorState
    }
  };
}

export function deleteNote(noteId, parentFolderName) {
  return {
    type: DELETE_NOTE,
    payload: {
      noteId,
      parentFolderName
    }
  };
}

export function setActiveNote(noteId) {
  return {
    type: SET_ACTIVE_NOTE,
    payload: {
      noteId
    }
  };
}

const initialState = {
  byId: {
    "0": {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(
          "Titolo 0\nlorem ipsum foo bar sit dolor amen lorepsum foo bar sit dolor amen"
        )
      ),
      creationDate: Date.now() - 1000 * 60 * 60 * 24
    },
    "1": {
      editorState: EditorState.createWithContent(
        ContentState.createFromText("Titolo 1\nlorem ipsum foo bar sit")
      ),
      creationDate: Date.now() - 1000 * 60 * 60 * 24 * 3
    },
    "2": {
      editorState: EditorState.createWithContent(
        ContentState.createFromText("Titolo 2\nlorem ipsum foo bar sit")
      ),
      creationDate: Date.now() - 1000 * 60 * 60 * 24 * 7
    }
  },
  allIds: ["0", "1", "2"],
  activeNote: "0"
};

export function notesReducer(state = initialState, { type, payload = {} }) {
  const { byId, allIds } = state;
  const { noteId, editorState } = payload;
  switch (type) {
    case CREATE_NEW_NOTE:
      return {
        allIds: allIds.concat(noteId),
        byId: {
          ...byId,
          [noteId]: {
            editorState,
            creationDate: Date.now(),
            parentFolderName: payload.parentFolderName
          }
        },
        activeNote: noteId
      };
    case DELETE_NOTE:
      return {
        ...state,
        allIds: allIds.filter(noteId => noteId !== payload.noteId),
        byId: _.omit(byId, payload.noteId)
      };
    case SET_ACTIVE_NOTE:
      return {
        ...state,
        activeNote: payload.noteId
      };
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [noteId]: { ...state.byId[noteId], editorState }
        }
      };
    default:
      return state;
  }
}
