
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-bootstrap';
import { FaEye, FaPen, FaTrash ,FaArrowLeft} from 'react-icons/fa';
import '../css/coursess.css';
import axios from 'axios';

function ViewCourse() {
  const location = useLocation();
  const data = location.state?.course_data;
  const token=localStorage.getItem("access_token")
  const [videoDetails, setVideoDetails] = useState({
    course: '',
    description: '',
    video: '',
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [btn, setBtn] = useState('Upload');
  const [videoData, setVideoData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setVideoDetails((prev) => ({
        ...prev,
        course: data.id,
      }));
      fetchData();
    }
  }, [data]);

  const fetchData = async () => {
    if (!data) return;

    if(!token){
       console.log("No token")
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/AdminUrls/fetchVideos/${data.id}/`,
        {
          method: 'GET',
            headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${ token }`,
    }
        }
      );

      const result = await response.json();
      setVideoData(result || []);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setVideoDetails({ ...videoDetails, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoDetails({
      course: data.id,
      description: '',
      video: '',
    });
    setBtn('Upload');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!videoDetails.video) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('course', videoDetails.course);
    formData.append('description', videoDetails.description);
    formData.append('video', videoDetails.video);

    if(!token){
      console.log("no token")
    }

    try {
      

      if (btn === 'Upload') {
        const response = await fetch(
          'http://127.0.0.1:8000/AdminUrls/upload_video/',{
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ token }`,
            },
            body: formData,

          }
         
        );

        console.log('Video uploaded successfully:', response.data);
        alert('Video uploaded successfully!');
        fetchData();
      } else if (btn === 'Save') {
        const response = await fetch(
          `http://127.0.0.1:8000/AdminUrls/updateVideos/${videoDetails.id}/`,
          {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ token }`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update video');
        }

        console.log('Video updated successfully!');
        fetchData();
      }

      closeModal();
    } catch (error) {
      console.error('Error uploading/updating video:', error);
      alert('Failed to process request.');
    }
  };

  const delModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const deleteVideo = async () => {
    if(!token){
      console.log("no token")
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/AdminUrls/DeleteVideo/${deleteId}/`,
        {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ token }`,
          },

        }
      );

      if (response.ok) {
        alert('Video deleted successfully!');
        setDeleteModal(false);
        fetchData();
      } else {
        alert('Failed to delete video.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editVideo = (data) => {
    setBtn('Save');
    setVideoDetails(data);
    setShowModal(true);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const showvideo=(data) => {

    console.log(data)

    navigate('../view-video',{state:{videoData:data}})

  }

  return (
    <div className='course-box'>
      <div className='d-flex justify-content-between align-items-center'>
        <div><FaArrowLeft onClick={() => navigate('../courses')}/></div>
        <h4>{data.course_name}</h4>
        <button
          onClick={() => setShowModal(true)}
          className='login-btn'
          style={{ width: '15%' }}
        >
          Upload Video
        </button>
      </div>

      <table className='table table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DESCRIPTION</th>
            <th>UPLOADED AT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {videoData.map((video, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{video.description}</td>
              <td>{video.uploaded_at}</td>
              <td>
                <span className='action' onClick={() => showvideo(video)}>
                  <FaEye />
                </span>
                <span className='action' onClick={() => editVideo(video)}>
                  <FaPen />
                </span>
                <span className='action' onClick={() => delModal(video.id)}>
                  <FaTrash />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>{btn === 'Upload' ? 'Upload New Video' : 'Edit Video'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                name='description'
                value={videoDetails.description}
                onChange={changeHandler}
                placeholder='Description'
                required
              />
              <input
                type='file'
                accept='video/*'
                onChange={(e) =>
                  setVideoDetails({ ...videoDetails, video: e.target.files[0] })
                }
                placeholder='Choose Video File'
                required
              />
              

              <div className='inputField'>
                <button type="submit" >{btn}</button>
                <button type="button" onClick={closeModal}>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className='modal-overlay1'>
          <div className='modal-content1'>
            <p>Do you want to delete?</p>
            <div className='d-flex modal-btns'>
              <button onClick={deleteVideo}>YES</button>
              <button onClick={() => setDeleteModal(false)} style={{ background: 'red' }}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCourse;
