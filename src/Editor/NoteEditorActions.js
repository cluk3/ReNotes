export const SET_FOCUS_EDITOR = "SET_FOCUS_EDITOR";

export function setFocusEditor(focusEditor) {
  return {
    type: SET_FOCUS_EDITOR,
    payload: {
      focusEditor
    }
  };
}

const initialState = { focusEditor: false };

export function editorReducer(state = initialState, { type, payload = {} }) {
  switch (type) {
    case SET_FOCUS_EDITOR:
      return { focusEditor: payload.focusEditor };
    default:
      return state;
  }
}
