import _ from "lodash";

export const CREATE_NEW_NOTE = "CREATE_NEW_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const SET_ACTIVE_NOTE = "SET_ACTIVE_NOTE";

export function createNewNote(parentFolderName, noteId) {
  return {
    type: CREATE_NEW_NOTE,
    payload: {
      noteId,
      parentFolderName
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
      text:
        "Titolo 0\nlorem ipsum foo bar sit dolor amen lorem ipsum foo bar sit dolor amenlorem ipsum foo bar sit dolor amen",
      creationDate: Date.now()
    },
    "1": {
      text:
        "Titolo 1\nlorem ipsum foo bar sit dolor amen lorem ipsum foo bar sit dolor amenlorem ipsum foo bar sit dolor amen",
      creationDate: Date.now()
    },
    "2": {
      text:
        "Titolo 2\nlorem ipsum foo bar sit dolor amen lorem ipsum foo bar sit dolor amenlorem ipsum foo bar sit dolor amen",
      creationDate: Date.now()
    }
  },
  allIds: ["0", "1", "2"]
};

export function notesReducer(state = initialState, { type, payload = {} }) {
  const { byId, allIds } = state;
  switch (type) {
    case CREATE_NEW_NOTE:
      const { noteId } = payload;
      return {
        allIds: allIds.concat(noteId),
        byId: {
          ...byId,
          [noteId]: {
            text: "",
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
    default:
      return state;
  }
}
