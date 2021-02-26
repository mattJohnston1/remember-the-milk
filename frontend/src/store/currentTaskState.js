import { csrfFetch } from './csrf';

const SET_TASK = "tasks/setTask";

const setTask = (task) => {
  return {
    type: SET_TASK,
    task,
  }
}

export const getOneTask = (taskId) => async dispatch => {
  const response = await csrfFetch(`api/tasks/test/${taskId}`);
  const task = await response.json();
  console.log("laksdjfakljsfdhkljashdf", task)
  dispatch(setTask(task));
}

const initialState = { task: {} };

const currentTaskStateReducer = (state = initialState, action) => {
  let newState = { task: {} };
  switch (action.type) {
    case SET_TASK:
      newState.task = action.task;
      return newState;
    default:
      return state;
  }
}

export default currentTaskStateReducer;
