import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    {
      user? (<Link className="create-spot-button" to='/spots/new'>Create a new spot</Link> ) : (<></>)
    }
      <button className="open-menu-button" onClick={openMenu}>
        <i className="fa-solid fa-bars fa-xl" /><span></span>
        <i className="fas fa-user-circle fa-xl" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-login-logout">
            <div> Hello, {user.username}</div>
            <div className="user-email-div">{user.email}</div>
            <div className="manage-spot-div"><Link to='/spots/current' className="manage-spot-link">Manage Spots</Link></div>
            <div>
              <button onClick={logout} className="user-logout-button">Log Out</button>
            </div>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
