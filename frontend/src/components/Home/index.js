import Sidebar from "../Sidebar"
import Tasks from "../Tasks"
import Task from "../Task"

import "./home.css"
import { useSelector } from 'react-redux'

export default function Home() {

  const open = useSelector(state => state.sidebarState.open);

  return (
    <div className="page">
      {open && (
        <Sidebar />
      )}
      <Tasks />
      <Task />
    </div>
  )
}
