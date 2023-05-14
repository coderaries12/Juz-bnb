// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-div'>
    <div className='nav-left-div'>
        <NavLink exact to="/" className="logo-nav">
          <img className='logo-image' src=" https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684096377/Airbnb-images/Logo_hxslbp.png" alt='logo' /> 
          </NavLink>
    </div>
    
    <div className='nav-right-div'>
      {isLoaded && (<ProfileButton user={sessionUser} />)}
    </div>
    </div>
  );
}

export default Navigation;
