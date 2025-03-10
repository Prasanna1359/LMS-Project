import axios from 'axios';
import React, { useState } from 'react'
import '../css/AddAdmin.css';

function AddAdminPage ()  {

    const [adminData,setAdminData]=useState({
        'username':"",
        "email":"",
        "password":"",
        "confirm_password":"",
        "panel":"admin",
    })

    const changeHandler=(e)=> {
        setAdminData({...adminData,[e.target.name]:e.target.value});
    }
    
    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            const response=await axios.post("http://127.0.0.1:8000/AdminUrls/AdminRegister",adminData)
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

  return (

    <div style={{width:'100%'}}>
 {/* <div style={{width:'20%'}}><AddAdminPage/></div>  */}
    <div className='container'>
        
        <div className='box'>
            <h2>ADD ADMIN</h2>
        <form onSubmit={submitHandler}>
            <div className='input-box'><input type="text" name='username' value={adminData.username} placeholder='Username' onChange={changeHandler} required/><br /></div>
           <div className='input-box'> <input type="email" name='email' value={adminData.email} placeholder='Email' onChange={changeHandler} required /><br /></div>
          <div className='input-box'> <input type="password" name='password' value={adminData.password} placeholder='Password' onChange={changeHandler} required /><br /></div> 
          <div className='input-box'>  <input type="text" name='confirm_password' value={adminData.confirm_password} placeholder='Confirm Password' onChange={changeHandler} required /><br /></div>
            <button type='submit'>Add Admin</button>
        </form>
        </div>
    </div>
    </div>

  )
}

export default AddAdminPage