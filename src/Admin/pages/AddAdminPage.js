import axios from 'axios';
import React, { useState,useEffect } from 'react'
import '../css/AddAdmin.css';

function AddAdminPage ()  {

    const [adminData,setAdminData]=useState({
        'username':"",
        "email":"",
        "password":"",
        "confirm_password":"",
        "panel":"admin",
    })

    const [adminDetails,setAdminDetails]=useState([])
    const [error,setError]=useState("")
    const [showModal,setShowModal]=useState(false)

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

    useEffect(() => {
            fetchAdminData();
        }, []);

    const fetchAdminData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/AdminUrls/retreiveAdmins/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
                     <h4><u>ADMINS</u></h4>
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
        
                    <button onClick={() => setShowModal(true)} className='login-btn'>ADD ADMIN</button>
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
             <button type='submit'>Add Admin</button>
             <button onClick={() => setShowModal(false)}>cancel</button>
         </form>
                 
          </div>
        </div>
      )}
    
    </>

    // <div style={{width:'100%'}}>
    // <div className='container'>
        
    //     <div className='box'>
    //         <h2>ADD ADMIN</h2>
    //     <form onSubmit={submitHandler}>
    //         <div className='input-box'><input type="text" name='username' value={adminData.username} placeholder='Username' onChange={changeHandler} required/><br /></div>
    //        <div className='input-box'> <input type="email" name='email' value={adminData.email} placeholder='Email' onChange={changeHandler} required /><br /></div>
    //       <div className='input-box'> <input type="password" name='password' value={adminData.password} placeholder='Password' onChange={changeHandler} required /><br /></div> 
    //       <div className='input-box'>  <input type="text" name='confirm_password' value={adminData.confirm_password} placeholder='Confirm Password' onChange={changeHandler} required /><br /></div>
    //         <button type='submit'>Add Admin</button>
    //     </form>
    //     </div>
    // </div>
    // </div>

  )
}

export default AddAdminPage