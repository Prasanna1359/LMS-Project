import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaArrowLeft } from 'react-icons/fa';
import '../../Admin/css/coursess.css';

function StudentViewCourse() {
   const location = useLocation();
    const data = location.state?.course_data;
    console.log(data.id,"data id")
    const token = localStorage.getItem("access_token");
   
    const [videoData, setVideoData] = useState([]);
    const [serachTxt, setSearchTxt] = useState("");
    const navigate = useNavigate();
  
    
  
    useEffect(() => {
      SearchCourses();
    }, [serachTxt]);
  
    const fetchData = async () => {
      if (!data || !token) return;
  
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/AdminUrls/fetchVideos/${data.id}/`,
          {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
  
        const result = await response.json();
        setVideoData(result || []);
        console.log(result)
      } catch (error) {
        console.log(error);
      }
    };
  
  
  
   
    
    const showvideo = (data) => {
      navigate('../view-video', { state: { videoData: data } });
    };
  
    const SearchCourses = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/AdminUrls/searchDescription?course_id=${data.id}&description=${serachTxt}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
  
        const rdata = await response.json();
        setVideoData(rdata);
        console.log(rdata)
      } catch (e) {
        console.log(e);
      }
    };
  
    if (!data) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='course-box'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex'>
          <div className='me-3'><FaArrowLeft onClick={() => navigate('../StudentCourses')} /></div>
          <h4>COURSE:   <span style={{color:"black"}}>{data.course_name}</span></h4>
  
          </div>
          
          <div>
            <input
              type="search"
              placeholder='search by topic'
              value={serachTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            />
          </div>
          
        </div>
  
        
  
       
  <table className="table table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>TOPIC</th>
        <th>UPLOADED AT</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {videoData.length > 0 ? (
        videoData.map((video, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{video.description}</td>
            <td>{video.uploaded_at}</td>
            <td>
              <span className="action" onClick={() => showvideo(video)}>
                <FaEye />
              </span>
              
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" style={{ textAlign: "center" }}>
            No data found
          </td>
        </tr>
      )}
    </tbody>
  </table>
  
      
        
      </div>
    );
  }
  

export default StudentViewCourse;
