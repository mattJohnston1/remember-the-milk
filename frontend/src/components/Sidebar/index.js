import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllLists } from '../../store/sidebar';
import { setListState } from '../../store/listState';

import './sidebar.css'
import { show } from '../../store/showListsState';

export default function Sidebar() {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.sidebar.lists);
  const userId = useSelector(state => state.session.user.id);
  const open = useSelector(state => state.showList.open);

  useEffect(async () => {
    await dispatch(getAllLists(userId));
  }, [dispatch])

  // useEffect(() => {
  //   document.addEventListener('click', () => console.log("YESSSSSSSS"));

  //   return () => document.removeEventListener("click", () => console.log("NOOOOOOO"));
  // }, [])
  const openList = () => {
    dispatch(show(!open))
  }
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img className="logo" src="http://jtalkonline.com/wp-content/uploads/2018/02/logo_rememberthemilk.png" />
      </div>
      <br></br>
      <div className="header-container">
        <a className="allTasks-header" onClick={() => { dispatch(setListState(null)) }}>All Tasks</a>
      </div>

      <br className="br-test"></br>
      <div className="lists-header-container">
        <a onClick={openList} className="lists-header">
          Lists
        </a>
      </div>

      <ul>
        {lists.map((list) => (
          <li><a
            className="list-name"
            hidden={open ? false : true}
            onClick={() => { dispatch(setListState(list.id)) }}>{list.name}</a></li>
        ))}
      </ul>
    </div >
  )
}
