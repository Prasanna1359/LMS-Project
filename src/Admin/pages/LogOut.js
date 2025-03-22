import React,{useState} from 'react'
import '../css/coursess.css';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    
       const [showModal,setShowModal]=useState(true)
       const navigate=useNavigate()
       
    
    //    const email=localStorage.getItem("email")

    const handleLogout = () => {
        // Clear authentication token (if stored in localStorage/sessionStorage)
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("csrf_token");
        localStorage.removeItem("")
        navigate("/AdminLogin"); // Redirect to login page
      };

      const cancleLogout =() =>{
        setShowModal(false)
        navigate("/admin_home")
      }
    
  return (
    <div>
       {showModal && (
        <div className='modal-overlay1'>
          <div className='modal-content1'>

               <h4 style={{color:"#ff416c"}}>LOGOUT</h4>

               <p>Are you sure want to logout?</p>


               <div className='d-flex modal-btns'>
              <button onClick={handleLogout}>YES</button>
              <button onClick={cancleLogout} style={{ background: 'red' }}>
                CANCEL
              </button>
            </div>
            </div>
          </div>
       
      )}
    </div>
  )
}

export default LogOut