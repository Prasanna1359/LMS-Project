
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
            
           <div className='navigator'> <button><Link className="nav-link active" aria-current="page" to="./courses">
              <span data-feather="home"></span>
              Profile
            </Link></button></div>
           <div className='navigator'> <button><Link className="nav-link" to="./students">
              <span data-feather="students"></span>
              Courses
            </Link></button></div>
           <div className='navigator'>  <button> <Link className="nav-link" to="./enrolled-students">
              <span data-feather="enrolled-students"></span>
              Change Password
            </Link></button></div>
           {/* <div className='navigator'>  <button><Link className="nav-link" to="./addAdmin">
              <span data-feather="addAdmin"></span>
              Add Admin
            </Link></button></div> */}

            <div className='navigator'>  <button><Link className="nav-link" to="/">
              <span data-feather="/"></span>
              Logout
            </Link></button></div>
 
 
         </div>
      </div>
 
     </div>
   )
 }
 

export default StudentSideBar;

