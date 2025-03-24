


import { Link } from 'react-router-dom';
import 'react-bootstrap';
import '../../Admin/css/AdminHome.css'
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentTopBar = ({ user }) => {
  const navigate=useNavigate()
  console.log(user);
  return (
    <nav className="navbar navbar-expand-md fixed-top w-100 nav-bar">
          <div className="d-flex w-100 justify-content-between">
            <div className="my-app">
              <h2>LMS</h2>
            </div>
            <div className="me-5 d-flex profile">
              <div className="me-2" onClick={() => navigate('./profile')}>
                <FaUserCircle />
              </div>
              <div>
                <h5 className="">Welcome {user || "Guest"}</h5>
              </div>
            </div>
          </div>
        </nav>
  );
};

export default StudentTopBar;

