import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import sidebarStateReducer from './sidebarState';
import sidebarReducer from './sidebar';
import listStateReducer from './listState';
import tasksReducer from './tasks';
import currentTaskStateReducer from './currentTaskState';
import showListStateReducer from './showListsState';
import modalReducer from './modalState';
import deleteReducer from './deleteModalState';

const rootReducer = combineReducers({
  session: sessionReducer,
  sidebar: sidebarReducer,
  sidebarState: sidebarStateReducer,
  listState: listStateReducer,
  tasks: tasksReducer,
  currentTask: currentTaskStateReducer,
  showList: showListStateReducer,
  showModal: modalReducer,
  deleteModal: deleteReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
