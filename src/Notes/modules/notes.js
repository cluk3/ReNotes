import _ from "lodash";
import { EditorState, ContentState } from "draft-js";
import uuidv4 from 'uuid/v4'
import {
  DELETE_FOLDER
} from "../../Folders/modules/folders";
import { electNewElement } from '../../helpers'

export const CREATE_NEW_NOTE = "CREATE_NEW_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const SET_ACTIVE_NOTE = "SET_ACTIVE_NOTE";
export const UPDATE_EDITOR_STATE = "UPDATE_EDITOR_STATE";
export const ELECT_NEW_ACTIVE = "ELECT_NEW_ACTIVE";

export function createNewNote(parentFolderId) {
  const noteId = uuidv4();
  return {
    type: CREATE_NEW_NOTE,
    payload: {
      noteId,
      parentFolderId,
      editorState: EditorState.moveFocusToEnd(
        EditorState.createEmpty()
      )
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

export function deleteNote(noteId, parentFolderId) {
  return {
    type: DELETE_NOTE,
    payload: {
      noteId,
      parentFolderId
    }
  };
}

export function deleteNoteAndElectNewActive(noteId, parentFolderId) {
  return (dispatch) => {
    dispatch({type: ELECT_NEW_ACTIVE,
      payload: {
        noteId,
        parentFolderId
      }
    });
    dispatch({type: DELETE_NOTE,
      payload: {
        noteId,
        parentFolderId
      }
    });
  }
}

export function setActiveNote(noteId) {
  return {
    type: SET_ACTIVE_NOTE,
    payload: {
      noteId
    }
  };
}

export const initialState = {
  byId: {
    "0": {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(
          "Titolo 0\nlorem ipsum foo bar sit dolor amen lorepsum foo bar sit dolor amen"
        )
      ),
      lastModified: Date.now() - 1000 * 60 * 60 * 24,
      parentFolderId: "0"
    },
    "1": {
      editorState: EditorState.createWithContent(
        ContentState.createFromText("Titolo 1\nlorem ipsum foo bar sit")
      ),
      lastModified: Date.now() - 1000 * 60 * 60 * 24 * 3,
      parentFolderId: "0"
    },
    "2": {
      editorState: EditorState.createWithContent(
        ContentState.createFromText("Titolo 2\nlorem ipsum foo bar sit")
      ),
      lastModified: Date.now() - 1000 * 60 * 60 * 24 * 7,
      parentFolderId: "1"
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
            lastModified: Date.now(),
            parentFolderId: payload.parentFolderId
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
    
    case ELECT_NEW_ACTIVE:
      const notesInActualFolder = state.allIds.filter(
        noteId => byId[noteId].parentFolderId === payload.parentFolderId
      );
      const deletedNoteIndex = _.findIndex(
        notesInActualFolder,
        noteId => noteId === payload.noteId
      );
      const newActiveNote = electNewElement(deletedNoteIndex, notesInActualFolder);

      return {
        ...state,
        activeNote: newActiveNote
      };

    case DELETE_FOLDER:
      const filteredIds = allIds.filter(noteId => byId[noteId].parentFolderId !== payload.folderId);
      return {
        ...state,
        allIds: allIds.filter(noteId => byId[noteId].parentFolderId !== payload.folderId),
        byId: _.pick(byId, filteredIds)
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
          [noteId]: {
            ...state.byId[noteId],
            editorState,
            lastModified: Date.now()
          }
        }
      };

    default:
      return state;
  }
}
