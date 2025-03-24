
import { Link } from 'react-router-dom';
import 'react-bootstrap';
import '../css/AdminHome.css';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Modal,ModalBody } from 'react-bootstrap';
import profileLogo from "../../Student/pages/assests/profileLogo.jpg"
const TopBar = ({ user }) => {
  
   const [showModal,setShowModal]=useState(false)

   const [data,setData]=useState([])

   const email=localStorage.getItem("email")
   const token=localStorage.getItem("access_token")
   
   const profile=async() => {
    if(!token){
      console.log("no token")
    }

    try{

      const response=await fetch(`http://127.0.0.1:8000/AdminUrls/searchprofile?email=${email}`,{
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token }`,
        }
      })
        const data=await response.json()
        console.log(data)
        setData(data)

    }catch(e){
      console.log(e)
    }
    setShowModal(true)
   }


  return (
    <>
   
    <nav className="navbar navbar-expand-md fixed-top w-100 nav-bar">
      <div className="d-flex w-100 justify-content-between">
        <div className="my-app">
          <h2>LMS</h2>
        </div>
        <div className="me-5 d-flex profile">
          <div className="me-2" onClick={profile}>
            <FaUserCircle />
          </div>
          <div>
            <h5 className="">Welcome {user || "Guest"}</h5>
          </div>
        </div>
      </div>
    </nav>



      {showModal && (
        <div className='modal-overlay1'>
          <div className='modal-content1'>

               <h4 style={{color:"#ff416c"}}>PROFILE</h4>

               <img src={`http://127.0.0.1:8000/${data.profile}` || {profileLogo}} alt="profile" style={{height:"50%",width:"50%"}} /> <br /> <br /> 
                <b>NAME:</b><p>{data.username}</p>
                <b>EMAIL:</b><p>{data.email}</p>


             
              <button onClick={() => setShowModal(false)}>
                CANCEL
              </button>
            </div>
          </div>
       
      )}
      
 </>
  );
};

export default TopBar;

