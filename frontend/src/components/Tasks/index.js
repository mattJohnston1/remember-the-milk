import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks, addNewTask, moveToChecked } from '../../store/tasks';
import { getOneTask } from '../../store/currentTaskState'

import './tasks.css';

export default function Tasks() {
  const userId = useSelector(state => state.session.user.id);
  const listId = useSelector(state => state.listState.listId);
  const tasks = useSelector(state => state.tasks.tasks);
  const [newTask, setNewTask] = useState('');
  const [checked, setChecked] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks(listId, userId));
  }, [dispatch, listId])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewTask(newTask, listId, userId));
    setNewTask('');
  }

  const handleCheck = (e) => {
    const val = Number(e.target.value);
    if (e.target.checked) {
      checked.push(val);
    } else {
      const idx = checked.indexOf(val);
      setChecked(prevState => removeItem(prevState, val))
    }
  }

  const handleChecks = async () => {
    await Promise.all(checked.map(async (taskId) => {
      await dispatch(moveToChecked(taskId, listId, userId))
    }))
    setChecked([]);
  }

  function removeItem(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  return (
    <div className="tasks">
      {listId || tasks.length !== 0 ? (<button className="check" onClick={handleChecks}>Mark As Complete</button>):null}
      <form onSubmit={handleSubmit}>
        {listId !== null ? (
        <input
          className="newTask-box"
          type="text"
          value={newTask}
          onChange={(e) => { setNewTask(e.target.value) }} placeholder="Add a task . . ."></input>
        ):null}
        {tasks.length === 0 ? (<div>No tasks yet, try adding a new list or task</div>): null}
      </form>
      {tasks.map((task) => (
        <div className="tasks-task">
          <input type="checkbox"
            className="myinput"
            value={task.id}
            onChange={handleCheck}
            key={task.id}
          />
          <a onClick={() => {
            dispatch(getOneTask(task.id))
          }}>{task.text}</a>
        </div>
      ))}
    </div>
  )
}
