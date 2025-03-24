import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-bootstrap';
import { FaLock} from 'react-icons/fa';
import "../css/studentChangePassword.css"
import { FaArrowLeft } from 'react-icons/fa'

function StudentChangePassword ()  {

    const [password,setPassword]=useState("")
    const [newpassword,setNewPassword]=useState("")
    const [confirm_password,setConfirmPassword]=useState("")
    const navigate=useNavigate()
    const [msg,setMsg]=useState("")
   
    const data=localStorage.getItem("user")
    const token =localStorage.getItem("access_token")
    const email=localStorage.getItem("email")
    const id=localStorage.getItem("id")

    const submitHandler=async(e) => {
        e.preventDefault()
        if(!token){
            console.log("no token")
            navigate('/student-login')
        }
        if(newpassword === confirm_password){
            try{
                const response = await fetch(
                    `http://127.0.0.1:8000/StudentUrls/ChangePassword/${id}/`,
                    {
                      method: 'PUT',
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ token }`,
                      },
                      body:JSON.stringify({'password':password,'newpassword':newpassword,'email':email})
                    }
                  );
                  setPassword("")
                  setConfirmPassword("")
                  setNewPassword("")
          

            }catch(error){
                console.log(error)
            }
        }
        else{
            setMsg("Passwords should not match!!")
            setPassword("")
            setConfirmPassword("")
            setNewPassword("")
        }
    }
  return (
    <div>
        
        <div className='container-box'>
        <div className='me-3 arrow'><FaArrowLeft onClick={() => navigate('/student-home')} /></div>
        
                <div className='login-box'>
                    <form onSubmit={submitHandler}>
                        <h2>Change Password</h2>
                        <div className='input-box'><FaLock className='icon'/><input type="password" name='password' value={password} placeholder='Current Password' onChange={(e) => setPassword(e.target.value)} required/></div>

                        <div className='input-box'><FaLock className='icon'/><input type="password" name='newpassword' value={newpassword} placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} required/></div>
                        <div className='input-box'><FaLock className='icon'/><input type="password" name='confirm_password' value={confirm_password} placeholder='Confirm New Password' onChange={(e) => setConfirmPassword(e.target.value)} required/></div>
                        <div><button type='submit' className='login-btn' style={{width:'40%'}}>UPDATE PASSWORD</button></div>
        
                        <div><p style={{color:'red'}}>{msg}</p></div>
        
                    </form>
                </div>
            </div>

    </div>
  )
}

export default StudentChangePassword