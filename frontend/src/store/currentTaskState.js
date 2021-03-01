import { csrfFetch } from './csrf';

const SET_TASK = "tasks/setTask";
const CLOSE = "tasks/close";

const setTask = (task, list) => {
  return {
    type: SET_TASK,
    task,
    list,
  }
}

export const close = () => {
  return {
    type: CLOSE,
  }
}

export const getOneTask = (taskId) => async dispatch => {
  const response = await csrfFetch(`api/tasks/test/${taskId}`);
  const task = await response.json();
  const listId = task.listId;
  const response2 = await csrfFetch(`api/sidebar/${listId}`);
  const list = await response2.json();
  dispatch(setTask(task, list));
}

const initialState = { task: {}, open: false, list: {} };

const currentTaskStateReducer = (state = initialState, action) => {
  let newState = { task: {}, open: false, list: {} };
  switch (action.type) {
    case SET_TASK:
      newState.task = action.task;
      newState.list = action.list;
      newState.open = true;
      return newState;
    case CLOSE:
      newState.open = false;
      newState.task = {};
      return newState;
    default:
      return state;
  }
}

export default currentTaskStateReducer;
