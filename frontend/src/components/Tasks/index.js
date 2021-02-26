import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks, addNewTask, moveToChecked } from '../../store/tasks';
import { getOneTask } from '../../store/currentTaskState'

export default function Tasks() {
  const userId = useSelector(state => state.session.user.id);
  const listId = useSelector(state => state.listState.listId);
  const tasks = useSelector(state => state.tasks.tasks);
  const [newTask, setNewTask] = useState('');
  const [checked, setChecked] = useState([]);

  const dispatch = useDispatch();
  useEffect(async () => {
    const tasks = await dispatch(getAllTasks(listId, userId));
  }, [dispatch, listId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addNewTask(newTask, listId, userId));

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
    console.log(val)
  }
  const handleChecks = async (e) => {
    checked.forEach(async (taskId) => {
      await dispatch(moveToChecked(taskId))
    })
    await dispatch(getAllTasks(listId, userId));
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
      tasks{listId}
      <button className="check" onClick={handleChecks}>Mark As Complete</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => { setNewTask(e.target.value) }}></input>
      </form>
      {tasks.map((task, idx) => (
        <div className="tasks-task">
          <input type="checkbox" value={task.id} onChange={handleCheck} />
          <a onClick={() => {
            console.log("TASK ID: ", task.id)
            dispatch(getOneTask(task.id))
          }}>{task.text}</a>
        </div>
      ))}
    </div>
  )
}
