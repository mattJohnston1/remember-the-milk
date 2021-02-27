import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modalState';
import { createList } from '../../store/sidebar';

import './modal.css'

export default function Modal() {
  const userId = useSelector(state => state.session.user.id);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const newList = (e) => {
    e.preventDefault();
    dispatch(createList(userId, name));
    setName("");
    dispatch(closeModal());
  }
  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>Name Your New List</h2>
        <label htmlFor="name" />
        <form className="modal-form" onSubmit={newList}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="buttons">
            <button type="submit">Submit</button>
            <button onClick={() => { dispatch(closeModal()) }}>Cancel</button>
          </div>
        </form>
      </div>
      <div>

      </div>
    </div>
  )
}
