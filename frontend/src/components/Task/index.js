import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks, addNewTask, moveToChecked } from '../../store/tasks';
import { close } from '../../store/currentTaskState';

import './task.css';

export default function Task() {
  const userId = useSelector(state => state.session.user.id);
  const listId = useSelector(state => state.listState.listId);
  const task = useSelector(state => state.currentTask.task);
  const list = useSelector(state => state.currentTask.list);

  const dispatch = useDispatch();

  function handleClose() {
    dispatch(close());
  }
  return (
    <div className="task">
      <div className="top">
        <div></div>
        <a onClick={handleClose} className="close">close x</a>
      </div>
      <div className="text">{task.text}</div>
      <div className="list">
        <div className="task-list">List</div>
        <div className="listName">{list.name}</div>
      </div>
    </div>
  )
}
