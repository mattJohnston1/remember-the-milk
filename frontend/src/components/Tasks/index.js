import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks, addNewTask } from '../../store/tasks';

export default function Tasks() {
  const userId = useSelector(state => state.session.user.id);
  const listId = useSelector(state => state.listState.listId);
  const tasks = useSelector(state => state.tasks.tasks);
  const [newTask, setNewTask] = useState('');

  const dispatch = useDispatch();
  useEffect(async () => {
    console.log("asdfjalkjsdh")
    const tasks = await dispatch(getAllTasks(listId, userId));
    console.log(tasks);
  }, [dispatch, listId])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addNewTask(newTask));

    setNewTask('');
  }

  return (
    <div className="tasks">
      tasks{listId}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => { setNewTask(e.target.value) }}></input>
      </form>
      {tasks.map((task, idx) => (
        <h2>{task.text}</h2>
      ))}
    </div>
  )
}
