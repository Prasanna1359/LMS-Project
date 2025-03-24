import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaPen, FaTrash, FaArrowLeft } from 'react-icons/fa';
import '../css/coursess.css';

function ViewCourse() {
  const location = useLocation();
  const data = location.state?.course_data;
  const token = localStorage.getItem("access_token");
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
  const [serachTxt, setSearchTxt] = useState("");
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

    try {
      const response = await fetch(
        btn === 'Upload'
          ? 'http://127.0.0.1:8000/AdminUrls/upload_video/'
          : `http://127.0.0.1:8000/AdminUrls/updateVideos/${videoDetails.id}/`,
        {
          method: btn === 'Upload' ? 'POST' : 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      alert(btn === 'Upload' ? 'Video uploaded successfully!' : 'Video updated successfully!');
      fetchData();
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
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/AdminUrls/DeleteVideo/${deleteId}/`,
        {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();

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

      const data = await response.json();
      setVideoData(data);
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
        <div className='me-3'><FaArrowLeft onClick={() => navigate('../courses')} /></div>
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
        <button
          onClick={() => setShowModal(true)}
          className='login-btn'
          style={{ width: '15%' }}
        >
          Upload Video
        </button>
      </div>

      

      {/* <table className='table table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>TOPIC</th>
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
      </table> */}

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
            <span className="action" onClick={() => editVideo(video)}>
              <FaPen />
            </span>
            <span className="action" onClick={() => delModal(video.id)}>
              <FaTrash />
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
                <button type="submit">{btn}</button>
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
