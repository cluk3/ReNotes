import omit from 'lodash/omit';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
import uuidv4 from 'uuid/v4';
import { DELETE_FOLDER, MOVE_NOTE_TO_FOLDER } from 'Folders/modules/folders';
import { electNewElement } from '../../helpers';

export const CREATE_NEW_NOTE = 'CREATE_NEW_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE';
export const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE';
export const DELETE_NOTE_AND_ELECT_NEW_ACTIVE =
  'DELETE_NOTE_AND_ELECT_NEW_ACTIVE';

export function createNewNote(parentFolderId) {
  const noteId = uuidv4();
  return {
    type: CREATE_NEW_NOTE,
    payload: {
      noteId,
      parentFolderId,
      editorState: {
        contents: {
          ops: [
            {
              insert: ''
            }
          ]
        },
        text: ''
      }
    }
  };
}

export function updateEditorState(contents, text, noteId, source) {
  return {
    type: UPDATE_EDITOR_STATE,
    payload: {
      noteId,
      editorState: {
        contents,
        text
      },
      lastModified: source === 'user' && Date.now()
    }
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

export function deleteNoteAndElectNewActive(noteId) {
  return {
    type: DELETE_NOTE_AND_ELECT_NEW_ACTIVE,
    payload: {
      noteId
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

const STUB_DATE = 1561406857389;

export const initialState = {
  byId: {
    '0': {
      editorState: {
        contents: {
          ops: [
            {
              insert:
                'Titolo 0\nlorem ipsum foo bar sit dolor amen lorepsum foo bar sit dolor amen\n'
            }
          ]
        },
        text:
          'Titolo 0\nlorem ipsum foo bar sit dolor amen lorepsum foo bar sit dolor amen\n'
      },
      lastModified: STUB_DATE - 1000 * 60 * 60 * 24,
      parentFolderId: '0'
    },
    '1': {
      editorState: {
        contents: { ops: [{ insert: 'Titolo 1\nlorem ipsum foo bar sit' }] },
        text: 'Titolo 1\nlorem ipsum foo bar sit'
      },
      lastModified: STUB_DATE - 1000 * 60 * 60 * 24 * 3,
      parentFolderId: '0'
    },
    '2': {
      editorState: {
        contents: { ops: [{ insert: 'Titolo 2\nlorem ipsum foo bar sit' }] },
        text: 'Titolo 2\nlorem ipsum foo bar sit'
      },
      lastModified: STUB_DATE - 1000 * 60 * 60 * 24 * 7,
      parentFolderId: '1'
    }
  },
  allIds: ['0', '1', '2'],
  activeNote: '0'
};

export function notesReducer(state = initialState, { type, payload = {} }) {
  const { byId: notesById, allIds: allNotesIds } = state;
  const { noteId, editorState } = payload;
  switch (type) {
    case CREATE_NEW_NOTE:
      return {
        allIds: [noteId, ...allNotesIds],
        byId: {
          ...notesById,
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
        allIds: allNotesIds.filter(_noteId => _noteId !== noteId),
        byId: omit(notesById, noteId)
      };

    case DELETE_NOTE_AND_ELECT_NEW_ACTIVE:
      return {
        ...state,
        allIds: allNotesIds.filter(_noteId => _noteId !== noteId),
        byId: omit(notesById, payload.noteId),
        activeNote: electNewNote(notesById, allNotesIds, noteId)
      };

    case DELETE_FOLDER:
      const filteredIds = allNotesIds.filter(
        noteId => notesById[noteId].parentFolderId !== payload.folderId
      );
      return {
        ...state,
        allIds: allNotesIds.filter(
          noteId => notesById[noteId].parentFolderId !== payload.folderId
        ),
        byId: pick(notesById, filteredIds),
        activeNote: null
      };

    case SET_ACTIVE_NOTE:
      return {
        ...state,
        activeNote: noteId
      };

    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        byId: {
          ...notesById,
          [noteId]: {
            ...notesById[noteId],
            editorState,
            lastModified: payload.lastModified || notesById[noteId].lastModified
          }
        }
      };

    case MOVE_NOTE_TO_FOLDER:
      return {
        ...state,
        byId: {
          ...notesById,
          [noteId]: {
            ...notesById[noteId],
            parentFolderId: payload.folderId
          }
        },
        activeNote: electNewNote(notesById, allNotesIds, noteId)
      };

    default:
      return state;
  }
}

function electNewNote(notesById, allNotesIds, noteId) {
  const { parentFolderId } = notesById[noteId];
  const notesInActualFolder = allNotesIds.filter(
    _noteId => notesById[_noteId].parentFolderId === parentFolderId
  );
  const deletedNoteIndex = findIndex(
    notesInActualFolder,
    _noteId => _noteId === noteId
  );
  return electNewElement(deletedNoteIndex, notesInActualFolder);
}
