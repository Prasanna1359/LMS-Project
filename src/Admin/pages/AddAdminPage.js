import axios from 'axios';
import React, { useState,useEffect } from 'react'
import '../css/AddAdmin.css';
import { useNavigate } from 'react-router-dom';
import {FaArrowLeft } from 'react-icons/fa';
// import "../css/coursess.css";
// import "../css/LoginCSS.css";

function AddAdminPage ()  {

    const [adminData,setAdminData]=useState({
        'username':"",
        "email":"",
        "password":"",
        "confirm_password":"",
        "panel":'admin',
        "profile":"",
    })
     const navigate=useNavigate()
    const [adminDetails,setAdminDetails]=useState([])
    const [error,setError]=useState("")
    const [showModal,setShowModal]=useState(false)
    const token=localStorage.getItem("access_token")

    const changeHandler=(e)=> {
        setAdminData({...adminData,[e.target.name]:e.target.value});
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', adminData.username);
        formData.append('email', adminData.email);
        formData.append('password', adminData.password);
        formData.append('confirm_password', adminData.confirm_password);
        formData.append('panel', adminData.panel);
        formData.append('profile', adminData.profile);
        if(!token){
            console.log("no token")
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/AdminUrls/AdminRegister/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${ token }`,
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setShowModal(false)
        setAdminData({
            'username':"",
            "email":"",
            "password":"",
            "confirm_password":"",
            "panel":'admin',
            "profile":"",
        })
        fetchAdminData()

    };
    

    useEffect(() => {
            fetchAdminData();
        }, []);

    const fetchAdminData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/AdminUrls/retreiveAdmins/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`,
                },
            });

            const data = await response.json();
            setAdminDetails(data);
            setError(response);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <>
        <div className='course-box'>

            <div className='d-flex justify-content-between align-items-center'>
                <div><FaArrowLeft onClick={() => navigate('/admin_home')}/></div>
                <div><h4><u>ADMINS</u></h4></div>
                <div></div>
                <div >  <button onClick={() => setShowModal(true)} className='login-btn ' >ADD ADMIN</button></div>
            </div>
                     



                    <table className="table table-hover">
                        <thead>
                            <tr>
                               <th>s.no</th>
                               <th>name</th>
                               <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminDetails.map((data, index) => (
                                <tr key={index}>
                                    <td>{index +1}</td>
                                    <td>{data.username}</td>
                                    <td>{data.email}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
        
                  
        </div>


        {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Enter Admin Details</h2>
            <form onSubmit={submitHandler}>
             <div className='input-box'><input type="text" name='username' value={adminData.username} placeholder='Username' onChange={changeHandler} required/><br /></div>
           <div className='input-box'> <input type="email" name='email' value={adminData.email} placeholder='Email' onChange={changeHandler} required /><br /></div>
           <div className='input-box'> <input type="password" name='password' value={adminData.password} placeholder='Password' onChange={changeHandler} required /><br /></div> 
           <div className='input-box'>  <input type="text" name='confirm_password' value={adminData.confirm_password} placeholder='Confirm Password' onChange={changeHandler} required /><br /></div>
           <div className="input-box"><input type="file" accept='images/*' name='profile'  placeholder='Profile' onChange={(e) =>
                    setAdminData({ ...adminData, profile: e.target.files[0] })
                  } required/></div>
                 

                  <div className='inputField'>
                <button type="submit" >Add Admin</button>
                <button type="button" onClick={() => setShowModal(false)} >CANCEL</button>
              </div>
                  
             
         </form>
                 
          </div>
        </div>
      )}
    
    </>

  

  )
}

export default AddAdminPage