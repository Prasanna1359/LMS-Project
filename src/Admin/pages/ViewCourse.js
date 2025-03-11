import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import 'react-bootstrap';
import { FaEye ,FaPen,FaTrash } from 'react-icons/fa';
import "../css/coursess.css";
import axios from 'axios';



function ViewCourse  () {
    const location=useLocation()
    const data=location.state?.course_data
    // console.log(data)

    const [videoDetails,setVideoDetails]=useState({
      "course":data.id,
      "description":"",
      "video":"",
    })
    const [deleteModal,setdeleteModal]=useState(false)

    const [btn,setBtn]=useState("upload")
    const [videoData,setVideoData]=useState([])
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [showModal,setShowModal]=useState(false)
    const [deleteId,setDeleteId]=useState(0)
    
    const closeDeleteModal = () => {
      setdeleteModal(false)
    }

    useEffect(() => {
      fetchData();
    },[])

    const fetchData = async(e) => {
      try{
        const response=await fetch(`http://127.0.0.1:8000/AdminUrls/fetchVideos/${data.id}/`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      const result = await response.json(); 
      setVideoData(result || []); 
      
      }catch(error){
        console.log(error)
      }
    }

    const changeHandler = (e) => {
      setVideoDetails({...videoDetails,[e.target.name]:e.target.value})
    }

    const closeModal = () => {
      setShowModal(false)
      setVideoDetails({
            description:"",
            video:"",
          })
    }


    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!videoDetails.video) {
          alert("Please select a video file.");
          return;
      }

      const formData = new FormData();
      formData.append("course", data.id);
      formData.append("description", videoDetails.description);
      formData.append("video", videoDetails.video);

      try {
          const response = await axios.post("http://127.0.0.1:8000/AdminUrls/upload_video/",formData);

          console.log("Video uploaded successfully:", response.data);
          alert("Video uploaded successfully!");

          setVideoDetails({
            description:"",
            video:"",
          })
          

          closeModal()

         
      } catch (error) {
          console.error("Error uploading video:", error);
          alert("Failed to upload video.");
      }
  };

  const delModal =(id) => {
    setdeleteModal(true)
    setDeleteId(id)
  }

  const deletevideo =async(e) => {

    console.log("deletinggggg")

    try{
      const response=await  fetch(`http://127.0.0.1:8000/AdminUrls/DeleteVideo/${deleteId}/`, {
        method: "DELETE",
        
    });

    if (response.ok) {
      alert("Video deleted successfully!");
      setdeleteModal(false); // Close modal after deletion
      fetchData(); // Refresh the video list
    } else {
      alert("Failed to delete video.");
    }

    


    }catch(error){
      console.log(error)

    }

  }


  return (
    <div className='course-box'>
                 
                 <div className='d-flex justify-content-between align-items-center'>
    
                  <div><h4>{data.course_name}</h4></div>
                  <div></div>
                  <div><button onClick={() => setShowModal(true)} className='login-btn' style={{width:'110%'}}>Upload Video</button></div>
    
                    
                    
                 </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DESCRIPTION</th>
                            <th>UPLOADED AT</th>
                            
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videoData.map((data, index) => (
                            <tr key={index}>
                                <td>{index +1}</td>
                                <td>{data.description}</td>
                                <td>{data.uploaded_at}</td>

                                
                                <td>
                                    
                                    <span className='action' ><FaEye/></span>
                                    <span className='action' ><FaPen/></span>
                                    <span className='action' onClick={() => delModal(data.id)}><FaTrash/></span>    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>






                  
{showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Upload New Video</h2>
            <form onSubmit={handleSubmit}>
               
                <input 
                    type="text" 
                    name='description'
                    value={videoDetails.description} 
                    onChange={changeHandler} 
                    placeholder='Description'
                    required 
                />

               
                <input type="file" accept="video/*" onChange={(e) =>
                    setVideoDetails({ ...videoDetails, video: e.target.files[0] })} placeholder='Choose Video File' required />

                <button type="submit">Upload Video</button>
                <button onClick={closeModal}>cancel</button>
            </form>
          </div>
        </div>
      )}
    


    
{deleteModal && (
        <div className='modal-overlay1' >
          <div className="modal-content1">
              <p>do you to delete</p>
              <div className='d-flex modal-btns'>
              <button  onClick={deletevideo}>YES</button>
              <button  onClick={closeDeleteModal} style={{background:'red'}}>CANCEL</button>
              </div>
          </div>
        </div>
      )}

            </div>
  )
}

export default ViewCourse