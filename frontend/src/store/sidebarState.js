const SET_STATE = "sidebar/setState";

export const setState = (open) => {
  return {
    type: SET_STATE,
    open
  }
}

const initialState = { open: false };

const sidebarStateReducer = (state = initialState, action) => {
  let newState = { open: null };
  switch (action.type) {
    case SET_STATE:
      newState.open = action.open;
      return newState;
    default:
      return state;
  }
};

export default sidebarStateReducer;
