import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDelete } from '../../store/deleteModalState';
import { deleteList, setListState } from '../../store/listState';
import { closeModal } from '../../store/modalState';
import { show } from '../../store/showListsState';
import { createList, removeList } from '../../store/sidebar';
import { deleteTasks } from '../../store/tasks';

import './DeleteModal.css'

export default function DeleteModal() {
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

  const listId = useSelector(state => state.listState.listId);
  const tasks = useSelector(state => state.tasks.tasks);

  const handleDelete = async () => {
    await dispatch(deleteTasks(tasks))
    await dispatch(removeList(listId))
    await dispatch(deleteList(listId))
  }

  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-label delete-label">Delete List</div>
        <label htmlFor="name" />
        <form className="modal-form" onSubmit={handleDelete}>
          <div className="modal-delete-text modal-label">Are you sure you want to delete this list, it will delete all of the tasks as well.</div>
          <div className="buttons">
            <button className="modal-add" type="submit">Delete</button>
            <button className="modal-cancel" onClick={() => { dispatch(closeDelete()) }}>Cancel</button>
          </div>
        </form>
      </div>
      <div>

      </div>
    </div>
  )
}
