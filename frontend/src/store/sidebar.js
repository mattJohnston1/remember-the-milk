import { csrfFetch } from './csrf';

const SET_LISTS = "sidebar/setLists";

const setLists = (lists) => {
  return {
    type: SET_LISTS,
    lists,
  }
}

export const getAllLists = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/sidebar/${userId}/lists`);

  if (!response.ok) throw response;
  const lists = await response.json();
  dispatch(setLists(lists));
  return lists;
}

const initialState = { lists: [] };

const sidebarReducer = (state = initialState, action) => {
  let newState = { lists: [] };
  switch (action.type) {
    case SET_LISTS:
      newState.lists = action.lists;
      return newState;
    default:
      return state;
  }
};

export default sidebarReducer;