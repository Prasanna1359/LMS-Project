import React from 'react'
import { Link } from 'react-router-dom'
import '../css/AdminHome.css'

function AdminHome ()  {
  return (
    <div>
     
     <div className='asidebar'>
        <div className='logo'>
          logo
        </div>
        <div className='buttons'>
           
          <div className='navigator'> <button><a href="">Courses</a></button></div>
          <div className='navigator'> <button><a href="">Students</a></button></div>
          <div className='navigator'>  <button><a href="/AddAdmin">Add Admin</a></button></div>
          <div className='navigator'>  <button><a href="">Enrolled Students</a></button></div>


        </div>
     </div>

    </div>
  )
}

export default AdminHome