const SET_LIST_STATE = 'sidebar/setListState';

export const setListState = (listId) => {
  return {
    type: SET_LIST_STATE,
    listId,
  }
}

const initialState = { listId: null };

const listStateReducer = (state = initialState, action) => {
  let newState = { listId: null };
  switch (action.type) {
    case SET_LIST_STATE:
      newState.listId = action.listId;
      return newState;
    default:
      return state;
  }
};

export default listStateReducer;
