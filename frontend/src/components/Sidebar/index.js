import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllLists } from '../../store/sidebar';
import { setListState } from '../../store/listState';
import { openModal } from '../../store/modalState';

import './sidebar.css'
import { show } from '../../store/showListsState';
import Modal from '../Modal';

export default function Sidebar() {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.sidebar.lists);
  const userId = useSelector(state => state.session.user.id);
  const open = useSelector(state => state.showList.open);
  const showModal = useSelector(state => state.showModal.open);

  useEffect(async () => {
    await dispatch(getAllLists(userId));
  }, [dispatch])

  const openList = () => {
    dispatch(show(!open))
  }


  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img className="logo" src="http://jtalkonline.com/wp-content/uploads/2018/02/logo_rememberthemilk.png" />
      </div>
      <br></br>
      <div className="lists-header-container">
        <button class="carret-right"><i class="fas fa-angle-right"></i></button>
        <a className="lists-header">All Tasks</a>
      </div>

      <br></br>
      <div className="lists-header-container">
        {!open ? <button onClick={openList} class="carret-right"><i class="fas fa-angle-right"></i></button > : <button onClick={openList} class="carret"><i class="fas fa-angle-down"></i></button>}
        <a onClick={openList} className="lists-header">Lists</a>
        <a onClick={() => dispatch(openModal())} class="addList">+</a>
      </div>

      <ul>
        {lists.map((list) => (
          <li><a
            className="list-name"
            hidden={open ? false : true}
            onClick={() => { dispatch(setListState(list.id)) }}>{list.name}</a></li>
        ))}
      </ul>
      {showModal && (
        <Modal />
      )}
    </div >
  )
}
