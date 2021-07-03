const OPEN = "delete/open";
const CLOSE = "delete/close";

export const openDelete = () => {
  return {
    type: OPEN,
  }
}

export const closeDelete = () => {
  return {
    type: CLOSE,
  }
}

const initialState = { open: false };

const deleteReducer = (state = initialState, action) => {
  let newState = { open: false };
  switch (action.type) {
    case OPEN:
      newState.open = true;
      return newState;
    case CLOSE:
      newState.open = false;
      return newState;
    default:
      return state;
  }
}

export default deleteReducer;
