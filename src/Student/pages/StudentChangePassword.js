import React, { useState } from 'react'

function StudentChangePassword ()  {

    const [password,setPassword]=useState("")
    const [newpassword,setNewPassword]=useState("")
    const [confirm_password,setConfirmPassword]=useState("")
    
    const [msg,setMsg]=useState("")

   

    const submitHandler=async(e) => {
        e.preventDefault()
        if(newpassword === confirm_password){
            try{
                const response=await axios.put("http://127.0.0.1:8000/AdminUrls/ResetPassword/",{'password':password,'id':data})
                setMsg(response.data.message)

                navigate('/AdminLogin')

            }catch(error){
                console.log(error)
            }
        }
        else{
            setMsg("Passwords should not match!!")
            setPassword("")
            setConfirmPassword("")
        }
    }
  return (
    <div>
        
        <div className='login-container'>
        
                <div className='login-box'>
                    <form onSubmit={submitHandler}>
                        <h2>Change Password</h2>
                        <div className='input-box'><FaLock className='icon'/><input type="password" name='password' value={password} placeholder='Current Password' onChange={(e) => setPassword(e.target.value)} required/></div>

                        <div className='input-box'><FaLock className='icon'/><input type="password" name='password' value={password} placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} required/></div>
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