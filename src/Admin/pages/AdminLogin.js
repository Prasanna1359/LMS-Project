import React, { useState } from "react";
import '../css/LoginCSS.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock ,FaEnvelope} from "react-icons/fa"; 
// import { loginApi } from "../AdminApi";

const AdminLogin = () => {
        const [loginData,setLoginData]=useState({
            'email':"",
            'password':"",
        })
    
        const changeHandler = (e) => {
          setLoginData({...loginData,[e.target.name]:e.target.value});
        }
        
        const navigate=useNavigate()
       
        const [id,setId]=useState("")
       
        
        const [error,setError]=useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    
          console.log("logging")
          
          try{
            console.log("logging")
            const response= await axios.post("http://127.0.0.1:8000/AdminUrls/AdminLogin/",loginData);
            
            setId(response.data.id)
          
           
            navigate('/verify_otp', {state:{"id":response.data.id ,"action":"login"}})
          }catch(error){
            console.error(error)
            if (error.response && error.response.status === 400) {
              setError(error.response.data); 
            } else {
              console.error("An unexpected error occurred:", error);
              alert("An error occurred. Please try again later.");
            }
          }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>ADMIN LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={changeHandler}
              required
            />
          </div>
          <p><a href="Forgot_password/">Forgot Password?</a></p>
          <button type="submit" className="login-btn">
            GET OTP
          </button>
           <p style={{color:'red'}}>
           {error.non_field_errors && (
    <div className="error">
        {Array.isArray(error.non_field_errors)
            ? error.non_field_errors.join(", ")
            : error.non_field_errors.toString()} 
    </div>
)}
           </p>
        </form>
        <p>
          Are you a Student?<br />
          <a href="" >Login</a>
        </p>
      </div>


    </div>
  );
};

export default AdminLogin;