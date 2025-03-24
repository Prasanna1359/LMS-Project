import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import '../css/LoginCSS.css';

function ForgotPassword  () {

    const [email,setEmail]=useState("")

    const [message,setMessage]=useState("")

    const [error,setError]=useState("")
     const [loading, setLoading] = useState(false);
    
    const navigate=useNavigate()
    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true)

         try{
            const response=await axios.post("http://127.0.0.1:8000/AdminUrls/VerifyEmail/",{"email":email})
            if(response.status == 200){
                setMessage(response.data.message)
                console.log(response.data.id)
                navigate('/verify_otp',{state:{"id":response.data.id,"action":"forgot-password"}})

            }
            
             

         }catch(error){
            console.log(error)
         }
         finally{
          setLoading(false);  
        }
    }

  return (
    <div className='login-container'>

      <div className='login-box'>

        <form onSubmit={submitHandler}>
          <h2>Enter Email</h2>
            <div className='input-box'><FaEnvelope className="icon" /><input type="email" name='email' value={email} placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/></div>
            <div>

            <button type="submit" className='login-btn' disabled={loading}>
            {loading ? "Sending..." : "Get OTP"}
          </button>

          {loading && <div className="loader"></div>} 
          </div>

        </form>
        </div>
    </div>
  )
}

export default ForgotPassword