import { csrfFetch } from './csrf';

const OPEN = "modal/open";
const CLOSE = "modal/close";

export const openModal = () => {
  return {
    type: OPEN,
  }
}

export const closeModal = () => {
  return {
    type: CLOSE,
  }
}

const initialState = { open: false };

const modalReducer = (state = initialState, action) => {
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

export default modalReducer;
