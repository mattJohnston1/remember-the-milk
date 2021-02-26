import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modalState';

import './modal.css'

export default function Modal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const newList = (e) => {
    e.preventDefault();
    console.log(name);

    setName("");
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
