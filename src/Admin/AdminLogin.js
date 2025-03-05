import React, { useState } from 'react'

function AdminLogin(){

    cosnt [loginData,setLoginData]=useState({
        'email':"",
        'password':"",
    })

    
  return (
    <>
        <h1>Admin Login</h1>
       <form>
        <input type="email" name='email' value={loginData.email} placeholder='email' onChange={changeHandler} required/>
        <input type="password" name='password' value={loginData.password} placeholder='password' required/>
        <button type='submit'>login</button>
       </form>
       
    </>
  )
}

export default AdminLogin