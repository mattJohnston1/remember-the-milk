import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import { useDispatch, useSelector } from "react-redux";
import { setState } from '../../store/sidebarState'

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }
  const dispatch = useDispatch();
  const sidebarState = useSelector(state => state.sidebarState.open);
  return (
    <ul className="nav-list">
      <li>
        <button className="sidebar-button" onClick={() => { dispatch(setState(!sidebarState)) }}>
          ☰
        </button>
        {/* <NavLink exact to="/">Home</NavLink> */}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
