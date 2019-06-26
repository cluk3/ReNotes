import uuidv4 from 'uuid/v4';
import omit from 'lodash/omit';
import {
  CREATE_NEW_NOTE,
  DELETE_NOTE,
  setActiveNote
} from 'Notes/modules/notes';
import { electNewElement } from 'helpers';

export const CREATE_NEW_FOLDER = 'CREATE_NEW_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const SET_ACTIVE_FOLDER = 'SET_ACTIVE_FOLDER';
export const CHANGE_FOLDER_NAME = 'CHANGE_FOLDER_NAME';
export const END_EDITING_NAME = 'END_EDITING_NAME';

export function createNewFolder(folderName) {
  const folderId = uuidv4();
  return dispatch => {
    dispatch({
      type: CREATE_NEW_FOLDER,
      payload: {
        folderName,
        folderId
      }
    });
    dispatch(setActiveFolder(folderId, null));
  };
}

export function deleteFolder(folders) {
  const { activeFolder, allIds, byId } = folders;
  const folderToDeleteIndex = allIds.indexOf(activeFolder);
  const newActiveFolder = electNewElement(folderToDeleteIndex, allIds);
  const newActiveNote = newActiveFolder ? byId[newActiveFolder].notes[0] : null;

  return dispatch => {
    dispatch({
      type: DELETE_FOLDER,
      payload: {
        folderId: activeFolder
      }
    });
    dispatch(setActiveFolder(newActiveFolder, newActiveNote));
  };
}

export function changeFolderName(folderId, newName) {
  return {
    type: CHANGE_FOLDER_NAME,
    payload: {
      newName,
      folderId
    }
  };
}

export function endEditingName() {
  return {
    type: END_EDITING_NAME
  };
}

export function setActiveFolder(folderId, firstNoteId) {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_FOLDER,
      payload: {
        folderId
      }
    });
    dispatch(setActiveNote(firstNoteId));
  };
}

const TEST_FOLDER = 'Test Folder';
const TEST_FOLDER_2 = 'Test Folder 2';
export const initialState = {
  byId: {
    '0': { notes: ['0', '1'], name: TEST_FOLDER },
    '1': { notes: ['2'], name: TEST_FOLDER_2 }
  },
  allIds: ['0', '1'],
  activeFolder: '0',
  editingName: null
};

export function foldersReducer(state = initialState, { type, payload = {} }) {
  const { folderName, folderId } = payload;
  switch (type) {
    case CREATE_NEW_FOLDER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [folderId]: {
            notes: [],
            name: folderName
          }
        },
        allIds: state.allIds.concat(folderId),
        activeFolder: folderId,
        editingName: folderId
      };
    case DELETE_FOLDER:
      return {
        ...state,
        byId: omit(state.byId, folderId),
        allIds: state.allIds.filter(id => folderId !== id),
        activeFolder: null
      };
    case CHANGE_FOLDER_NAME:
      const { newName } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [folderId]: {
            ...state.byId[folderId],
            name: newName
          }
        },
        editingName: null
      };
    case CREATE_NEW_NOTE:
      const parentFolder = state.byId[payload.parentFolderId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.parentFolderId]: {
            ...parentFolder,
            notes: parentFolder.notes.concat(payload.noteId)
          }
        }
      };
    case DELETE_NOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.parentFolderId]: {
            ...state.byId[payload.parentFolderId],
            notes: state.byId[payload.parentFolderId].notes.filter(
              note => payload.noteId !== note
            )
          }
        }
      };
    case SET_ACTIVE_FOLDER:
      return {
        ...state,
        activeFolder: folderId
      };
    case END_EDITING_NAME:
      return {
        ...state,
        editingName: null
      };
    default:
      return state;
  }
}
