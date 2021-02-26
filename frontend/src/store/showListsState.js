const SHOW_LISTS = "lists/show"

export const show = (boolean) => {
  return {
    type: SHOW_LISTS,
    open: boolean,
  }
}

const initialState = { open: false };

const showListStateReducer = (state = initialState, action) => {
  let newState = { open: false };
  switch (action.type) {
    case SHOW_LISTS:
      newState.open = action.open;
      return newState;
    default:
      return state;
  }
}

export default showListStateReducer;
