import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllLists, setLists } from '../../store/sidebar';
import { setListState } from '../../store/listState'

export default function Sidebar() {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.sidebar.lists);
  const userId = useSelector(state => state.session.user.id);

  useEffect(async () => {
    const lists = await dispatch(getAllLists(userId));
    console.log(lists)
  }, [dispatch])

  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <br></br>
      <button onClick={() => { dispatch(setListState(null)) }}>All Tasks</button>

      <br></br>
      <div className="lists-header">
        <h2>lists</h2>
      </div>

      <ul>
        {lists.map((list) => (
          <li><a onClick={() => { dispatch(setListState(list.id)) }}>{list.name}</a></li>
        ))}
      </ul>
    </div>
  )
}
