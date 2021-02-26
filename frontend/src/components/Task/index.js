import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks, addNewTask, moveToChecked } from '../../store/tasks';

export default function Task() {
  const userId = useSelector(state => state.session.user.id);
  const listId = useSelector(state => state.listState.listId);
  const task = useSelector(state => state.currentTask.task);
  console.log("ON THE TASK PAGE", task);
  return (
    <div className="task">
      <div>{task.text}</div>
    </div>
  )
}
