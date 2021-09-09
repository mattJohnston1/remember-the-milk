import { csrfFetch } from './csrf';

const SET_TASKS = "tasks/setTasks";

const setTasks = (tasks) => {
  return {
    type: SET_TASKS,
    tasks,
  }
}

export const moveToChecked = (taskId, listId, userId) => async dispatch => {
  await csrfFetch(`api/tasks/${taskId}`, {
    method: 'DELETE',
  })
  await dispatch(getAllTasks(listId, userId));
}

export const getAllTasks = (listId, userId) => async dispatch => {
  let response;
  if (listId === null) {
    response = await csrfFetch(`api/tasks/${userId}`);
  } else {
    response = await csrfFetch(`api/tasks/list/${userId}/${listId}`);
  }

  if (!response.ok) throw response;
  const tasks = await response.json();
  dispatch(setTasks(tasks));
  return tasks;
}

export const addNewTask = (task, listId, userId) => async dispatch => {
  const response = await csrfFetch(`/api/tasks/${userId}/${listId}`, {
    method: 'POST',
    body: JSON.stringify({ text: task })
  })
  dispatch(getAllTasks(listId, userId));
  const newTask = await response.json();
  return newTask;
}

export const deleteTasks = (tasks) => async dispatch => {
  tasks.forEach((task) => {
    csrfFetch(`/api/tasks/${task.id}`, {
      method: 'DELETE'
    })
  })
}

const initialState = { tasks: [] };

const tasksReducer = (state = initialState, action) => {
  let newState = { ...state, tasks: [] };
  switch (action.type) {
    case SET_TASKS:
      newState.tasks = action.tasks;
      return newState;
    default:
      return state;
  }
}

export default tasksReducer;
