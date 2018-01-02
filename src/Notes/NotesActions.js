import _ from "lodash";

export const CREATE_NEW_NOTE = "CREATE_NEW_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

const getNewId = allIds => (parseInt(_.last(allIds), 10) + 1).toString();

export function createNewNote() {
  return {
    type: CREATE_NEW_NOTE
  };
}

export function deleteNote(noteId) {
  return {
    type: DELETE_NOTE,
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
      const noteId = state.allIds.length > 0 ? getNewId(allIds) : "0";
      return {
        allIds: allIds.concat(noteId),
        byId: {
          ...byId,
          [noteId]: {
            text: "",
            creationDate: Date.now()
          }
        }
      };
    case DELETE_NOTE:
      return {
        allIds: allIds.filter(noteId => payload.noteId !== noteId),
        byId: _.omit(byId, payload.noteId)
      };
    default:
      return state;
  }
}
