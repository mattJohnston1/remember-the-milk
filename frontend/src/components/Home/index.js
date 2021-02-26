import Sidebar from "../Sidebar"
import Tasks from "../Tasks"
import Task from "../Task"

import "./home.css"
import { useSelector } from 'react-redux'

export default function Home() {

  const sidebarOpen = useSelector(state => state.sidebarState.open);
  const taskOpen = useSelector(state => state.currentTask.open);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return (
    <div className="page">
      {sidebarOpen && (
        <Sidebar />
      )}
      <Tasks />
      {taskOpen && (
        <Task />
      )}
    </div>
  )
}
