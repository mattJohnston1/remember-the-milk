import Sidebar from "../Sidebar"
import Tasks from "../Tasks"
import Task from "../Task"

import "./home.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteTasks } from '../../store/tasks'
import { deleteList } from '../../store/listState'
import { getAllLists, removeList } from '../../store/sidebar'
import { useEffect, useState } from 'react'
import { openDelete } from '../../store/deleteModalState'

export default function Home() {
  const dispatch = useDispatch()

  const sidebarOpen = useSelector(state => state.sidebarState.open);
  const taskOpen = useSelector(state => state.currentTask.open);
  const listsObj = useSelector(state => state.sidebar);
  const listId = useSelector(state => state.listState.listId);
  const tasks = useSelector(state => state.tasks.tasks);

  const [loaded, setLoaded] = useState(false)

  const listsArr = Object.values(listsObj)
  console.log("LISTS OBJ: ", listsObj)

  let name = null;
  listsArr.map((list) => {
    if (list.id === listId) {
      name = list.name;
    }
  })

  useEffect(async () => {
    await dispatch(getAllLists())

  }, [dispatch])

  return (
    <div className="page">
      {sidebarOpen && (
        <Sidebar
        // lists={lists}
        />
      )}
      <Tasks />
      {taskOpen && (
        <Task />
      )}
      {!taskOpen && (
        <div className="task-lists-description">
          <h2 className="task-title">{name ? name : "All Tasks"}</h2>
          <div onClick={() => dispatch(openDelete())} className="task-list-delete">{name ? "delete" : ""}</div>
        </div>
      )}
    </div>
  )
}
