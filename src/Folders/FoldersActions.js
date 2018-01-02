import { combineReducers } from "redux";
import _ from "lodash";

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

function foldersByName(
  state = { [TEST_FOLDER]: { notes: ["0", "1"] } },
  { type, payload = {} }
) {
  const { folderName } = payload;
  switch (type) {
    case CREATE_NEW_FOLDER:
      return {
        ...state,
        [folderName]: {
          notes: []
        }
      };
    case DELETE_FOLDER:
      return _.omit(state, folderName);
    default:
      return state;
  }
}

function allFolders(state = [TEST_FOLDER], { type, payload = {} }) {
  const { folderName } = payload;
  switch (type) {
    case CREATE_NEW_FOLDER:
      return state.concat(folderName);
    case DELETE_FOLDER:
      return state.filter(_folderName => folderName !== _folderName);
    default:
      return state;
  }
}

function activeFolder(state = "", { type, payload = {} }) {
  const { folderName } = payload;
  switch (type) {
    case SET_ACTIVE_FOLDER:
      return folderName;
    default:
      return state;
  }
}

export const foldersReducer = combineReducers({
  byName: foldersByName,
  allNames: allFolders,
  activeFolder
});
