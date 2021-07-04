import { csrfFetch } from './csrf';

const SET_LISTS = "sidebar/setLists";
const REMOVE_LIST = "sidebar/removeList";

const setLists = (lists) => {
  return {
    type: SET_LISTS,
    lists,
  }
}
export const removeList = (listId) => {
  return {
    type: REMOVE_LIST,
    listId,
  }
}

export const getAllLists = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/sidebar/${userId}/lists`);

  if (!response.ok) throw response;
  const lists = await response.json();
  console.log("ALL MY LSITS :?:::::::::::::::::::::::", lists)
  dispatch(setLists(lists));
  return lists;
}

export const createList = (userId, name) => async dispatch => {
  const response = await csrfFetch(`/api/sidebar/${userId}/lists`, {
    method: "POST",
    body: JSON.stringify({ name })
  });
  const newList = await response.json();
  dispatch(getAllLists(userId));
  return newList;
};

const initialState = {};

const sidebarReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_LISTS:
      action.lists.forEach((list) => {
        newState[list.id] = list;
      })
      return newState;
    case REMOVE_LIST:
      newState = { ...state }
      delete newState[action.listId]
      return newState;
    default:
      return state;
  }
};

export default sidebarReducer;
