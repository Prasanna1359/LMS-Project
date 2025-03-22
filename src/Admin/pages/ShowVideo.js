import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


import { FaArrowLeft  } from 'react-icons/fa';
function ShowVideo  ()  {
    const location=useLocation()
    const video=location.state?.videoData
    const navigate=useNavigate()
    console.log(video)

    const videoUrl = `http://127.0.0.1:8000/${video.video}`;
  return (
    <div>
      <div className='d-flex'>
      <div className='me-5'><FaArrowLeft onClick={() => navigate(-1)}/></div>
      <h4 style={{color:"#e63a62"}}>TOPIC:<span style={{color:"black"}}>{video.description}</span></h4>
      </div>
     
        <video width="600" controls autoPlay>
         <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

    </div>
  )
}

export default ShowVideo