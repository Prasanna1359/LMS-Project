
import { Link } from 'react-router-dom';
import  '../../Admin/css/AdminHome.css'
import logo from "./assests/logo.jpg"


const StudentSideBar = () => {
 
   return (
     <div>
      
      <div className='asidebar'>
         <div className='logo'>

         <img src={logo} alt="logo" />
           
         </div>
         <div className='buttons'>
            
           <div className='navigator'> <button><Link className="nav-link active" aria-current="page" to="./profile">
              <span data-feather="profile"></span>
              Profile
            </Link></button></div>
           <div className='navigator'> <button><Link className="nav-link" to="./StudentCourses">
              <span data-feather="StudentCourses"></span>
              Courses
            </Link></button></div>
           <div className='navigator'>  <button> <Link className="nav-link" to="./studentChangePassword">
              <span data-feather="studentChangePassword"></span>
              Change Password
            </Link></button></div>
           {/* <div className='navigator'>  <button><Link className="nav-link" to="./addAdmin">
              <span data-feather="addAdmin"></span>
              Add Admin
            </Link></button></div> */}

            <div className='navigator'>  <button><Link className="nav-link" to="./logout">
              <span data-feather="logout"></span>
              Logout
            </Link></button></div>
 
 
         </div>
      </div>
 
     </div>
   )
 }
 

export default StudentSideBar;

