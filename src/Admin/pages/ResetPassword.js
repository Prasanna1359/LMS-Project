import userEvent from '@testing-library/user-event'
import axios from 'axios'
import React, { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'

function ResetPassword  ()  {
    const [password,setPassword]=useState("")
    const [confirm_password,setConfirmPassword]=useState("")
    const navigate=useNavigate()
    const location=useLocation()
    const [msg,setMsg]=useState("")

    const data=location.state?.user 
    console.log(data)

    const submitHandler=async(e) => {
        e.preventDefault()
        if(password === confirm_password){
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
    <div className='container'>

        <div className='box'>
            <form onSubmit={submitHandler}>
                <h2>Set New Password</h2>
                <div className='input-box'><FaLock className='icon'/><input type="password" name='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/></div>
                <div className='input-box'><FaLock className='icon'/><input type="password" name='confirm_password' value={confirm_password} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} required/></div>
                <div><button type='submit'>RESET PASSWORD</button></div>

                <div><p style={{color:'red'}}>{msg}</p></div>

            </form>
        </div>
    </div>
  )
}

export default ResetPassword
