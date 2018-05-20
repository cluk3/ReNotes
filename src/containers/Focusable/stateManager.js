import { ENTITIES } from "../../constants";

export const SET_FOCUSED_ELEMENT = "SET_FOCUSED_ELEMENT";

export function setFocusedElement(elementType) {
  return {
    type: SET_FOCUSED_ELEMENT,
    payload: {
      elementType
    }
  };
}

export function focusableReducer(
  state = { elementType: ENTITIES.FOLDERS },
  { type, payload = {} }
) {
  switch (type) {
    case SET_FOCUSED_ELEMENT:
      const { elementType } = payload;
      return {
        elementType
      };
    default:
      return state;
  }
}
