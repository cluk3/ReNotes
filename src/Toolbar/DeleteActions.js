export const SET_ITEM_TO_DELETE = "SET_ITEM_TO_DELETE";

export function setItemToDelete(entity, id) {
  return {
    type: SET_ITEM_TO_DELETE,
    payload: {
      entity,
      id
    }
  };
}

export function deleteReducer(state = {}, { type, payload = {} }) {
  switch (type) {
    case SET_ITEM_TO_DELETE:
      const { entity, id } = payload;
      return {
        entity,
        id
      };
    default:
      return state;
  }
}
