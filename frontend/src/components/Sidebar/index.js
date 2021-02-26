import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllLists } from '../../store/sidebar';
import { setListState } from '../../store/listState';

import './sidebar.css'

export default function Sidebar() {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.sidebar.lists);
  const userId = useSelector(state => state.session.user.id);

  useEffect(async () => {
    await dispatch(getAllLists(userId));
  }, [dispatch])

  return (
    <div className="sidebar">
      <div className="sidebar-logo"></div>
      <br></br>
      <a onClick={() => { dispatch(setListState(null)) }}>All Tasks</a>

      <br></br>
      <div className="lists-header">
        <h2>lists</h2>
      </div>

      <ul>
        {lists.map((list) => (
          <li><a className="list-name" onClick={() => { dispatch(setListState(list.id)) }}>{list.name}</a></li>
        ))}
      </ul>
    </div>
  )
}
