import { csrfFetch } from './csrf';

const SET_TASK = "tasks/setTask";
const CLOSE = "tasks/close";

const setTask = (task) => {
  return {
    type: SET_TASK,
    task,
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
  dispatch(setTask(task));
}

const initialState = { task: {}, open: false };

const currentTaskStateReducer = (state = initialState, action) => {
  let newState = { task: {}, open: false };
  switch (action.type) {
    case SET_TASK:
      newState.task = action.task;
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
