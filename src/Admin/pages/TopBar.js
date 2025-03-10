import { Link } from 'react-router-dom';
import 'react-bootstrap';
import '../css/AdminHome.css'
import React from 'react';

const TopBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary h-25">
      <div className='nav-bar'>

        <div className='my-app'><h2>LMS</h2></div>

        
        <div className="ml-auto">
          <div className="profile">
            Profile
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;

