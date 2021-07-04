import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListState } from '../../store/listState';
import { closeModal } from '../../store/modalState';
import { show } from '../../store/showListsState';
import { createList } from '../../store/sidebar';
import { setState } from '../../store/sidebarState';

import './modal.css'

export default function Modal() {
  const userId = useSelector(state => state.session.user.id);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const newList = async (e) => {
    e.preventDefault();
    const newList = await dispatch(createList(userId, name));
    const latest = newList[newList.length - 1]
    dispatch(setListState(latest.id))
    dispatch(show(true))
    setName("");
    dispatch(closeModal());
  }
  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-label">Name your new list</div>
        <label htmlFor="name" />
        <form className="modal-form" onSubmit={newList}>
          <input className="modal-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="buttons">
            <button className="modal-add" type="submit">Add</button>
            <button className="modal-cancel" onClick={() => { dispatch(closeModal()) }}>Cancel</button>
          </div>
        </form>
      </div>
      <div>

      </div>
    </div>
  )
}
