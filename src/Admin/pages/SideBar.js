
import { Link } from 'react-router-dom';
import '../css/AdminHome.css';

const SideBar = () => {
 
   return (
     <div>
      
      <div className='asidebar'>
         <div className='logo'>
           
         </div>
         <div className='buttons'>
            
           <div className='navigator'> <button><Link className="nav-link active" aria-current="page" to="./courses">
              <span data-feather="home"></span>
              Courses
            </Link></button></div>
           <div className='navigator'> <button><Link className="nav-link" to="./students">
              <span data-feather="students"></span>
              Add Students
            </Link></button></div>
           <div className='navigator'>  <button> <Link className="nav-link" to="./settings">
              <span data-feather="settings"></span>
              Enrolled Students
            </Link></button></div>
           <div className='navigator'>  <button><Link className="nav-link" to="./addAdmin">
              <span data-feather="addAdmin"></span>
              Add Admin
            </Link></button></div>

            <div className='navigator'>  <button><Link className="nav-link" to="/">
              <span data-feather="/"></span>
              Logout
            </Link></button></div>
 
 
         </div>
      </div>
 
     </div>
   )
 }
 

export default SideBar;

