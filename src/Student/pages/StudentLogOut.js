import React,{useState} from 'react'
import '../../Admin/css/coursess.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Student/AuthContext';

const LogOut = () => {
    
       const [showModal,setShowModal]=useState(true)
       const navigate=useNavigate()
       const { logout } = useAuth();
       
    
    

    const handleLogout = () => {
        
        logout();
        navigate("/AdminLogin"); 
      };

      const cancleLogout =() =>{
        setShowModal(false)
        navigate("/student-home")
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