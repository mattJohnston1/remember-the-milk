import Tasks from "../Tasks"
import Sidebar from "../Sidebar"

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
    </div>
  )
}
