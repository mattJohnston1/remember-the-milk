import Sidebar from "../Sidebar"
import Tasks from "../Tasks"
import Task from "../Task"

import "./home.css"
import { useSelector } from 'react-redux'

export default function Home() {

  const sidebarOpen = useSelector(state => state.sidebarState.open);
  const taskOpen = useSelector(state => state.currentTask.open);
  const lists = useSelector(state => state.sidebar.lists);
  const listId = useSelector(state => state.listState.listId);

  let name = null;
  lists.map((list) => {
    if (list.id === listId) {
      name = list.name;
    }
  })

  return (
    <div className="page">
      {sidebarOpen && (
        <Sidebar />
      )}
      <Tasks />
      {taskOpen && (
        <Task />
      )}
      {!taskOpen && (
        <h2>{name ? name : "All Tasks"}</h2>
      )}
    </div>
  )
}
