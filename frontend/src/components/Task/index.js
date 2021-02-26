import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks, addNewTask, moveToChecked } from '../../store/tasks';

import './task.css';

export default function Task() {
  const userId = useSelector(state => state.session.user.id);
  const listId = useSelector(state => state.listState.listId);
  const task = useSelector(state => state.currentTask.task);
  console.log("ON THE TASK PAGE", task);
  return (
    <div className="task">
      <div className="top">
        <div></div>
        <a className="close">close x</a>
      </div>
      <div className="text">{task.text}</div>
      <div className="list">
        <div className="task-list">List</div>
        <div className="listName">Homework</div>
      </div>
      {/* <input type="text" /> */}
    </div>
  )
}
