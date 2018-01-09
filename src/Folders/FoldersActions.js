import _ from "lodash";
import { CREATE_NEW_NOTE, DELETE_NOTE } from "../Notes/NotesActions";

export const CREATE_NEW_FOLDER = "CREATE_NEW_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const SET_ACTIVE_FOLDER = "SET_ACTIVE_FOLDER";

export function createNewFolder(folderName) {
  return {
    type: CREATE_NEW_FOLDER,
    payload: {
      folderName
    }
  };
}

export function deleteFolder(folderName) {
  return {
    type: DELETE_FOLDER,
    payload: {
      folderName
    }
  };
}

export function setActiveFolder(folderName) {
  return {
    type: SET_ACTIVE_FOLDER,
    payload: {
      folderName
    }
  };
}

const TEST_FOLDER = "Test Folder";
const TEST_FOLDER_2 = "Test Folder 2";
const initialState = {
  byName: {
    [TEST_FOLDER]: { notes: ["0", "1"] },
    [TEST_FOLDER_2]: { notes: ["2"] }
  },
  allNames: [TEST_FOLDER, TEST_FOLDER_2],
  activeFolder: TEST_FOLDER
};

export function foldersReducer(state = initialState, { type, payload = {} }) {
  const { folderName } = payload;
  switch (type) {
    case CREATE_NEW_FOLDER:
      return {
        ...state,
        byName: {
          ...state.byName,
          [folderName]: {
            notes: []
          }
        },
        allNames: state.allNames.concat(folderName)
      };
    case DELETE_FOLDER:
      return {
        ...state,
        byName: _.omit(state.byName, folderName),
        allNames: state.allNames.filter(
          _folderName => folderName !== _folderName
        )
      };
    case CREATE_NEW_NOTE:
      return {
        ...state,
        byName: {
          ...state.byName,
          [payload.parentFolderName]: {
            notes: state.byName[payload.parentFolderName].notes.concat(
              payload.noteId
            )
          }
        }
      };
    case DELETE_NOTE:
      return {
        ...state,
        byName: {
          ...state.byName,
          [payload.parentFolderName]: {
            notes: state.byName[payload.parentFolderName].notes.filter(
              note => payload.noteId !== note
            )
          }
        }
      };
    case SET_ACTIVE_FOLDER:
      return {
        ...state,
        activeFolder: payload.folderName
      };
    default:
      return state;
  }
}
