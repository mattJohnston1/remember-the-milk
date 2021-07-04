import { csrfFetch } from './csrf';

const SET_LIST_STATE = 'sidebar/setListState';
const DELETE_LIST_STATE = 'sidebar/deleteListState';

export const setListState = (listId) => {
  return {
    type: SET_LIST_STATE,
    listId,
  }
}

const deleteListState = () => {
  return {
    type: DELETE_LIST_STATE,
  }
}

export const deleteList = (listId) => async dispatch => {
  const response = await csrfFetch(`/api/sidebar/list/${listId}`, {
    method: "DELETE"
  })
  dispatch(deleteListState())
}

const initialState = { listId: null };

const listStateReducer = (state = initialState, action) => {
  let newState = { listId: null };
  switch (action.type) {
    case SET_LIST_STATE:
      newState.listId = action.listId;
      return newState;
    case DELETE_LIST_STATE:
      newState.listId = null;
      return newState;
    default:
      return state;
  }
};

export default listStateReducer;
