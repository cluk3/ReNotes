export const SET_SELECTED = "SET_SELECTED";

export function setSelectedElement(entity, id) {
  return {
    type: SET_SELECTED,
    payload: {
      entity,
      id
    }
  };
}

export function deleteReducer(state = {}, { type, payload = {} }) {
  switch (type) {
    case SET_SELECTED:
      const { entity, id } = payload;
      return {
        entity,
        id
      };
    default:
      return state;
  }
}
