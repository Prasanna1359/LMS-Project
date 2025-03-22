import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-bootstrap';

import { FaEye ,FaPen,FaTrash,FaArrowLeft  } from 'react-icons/fa';
import axios from 'axios';
import "../css/coursess.css";


function Courses() {
    const [courseData, setCourseData] = useState({
        course_name: "",
        course_photo: "",
        tutor_name: "",
        tutor_email: "",
        tutor_contact: "",
    });
    const [courseDetails, setCourseDetails] = useState([]);
    const navigate = useNavigate();
    // const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [deleteId,setDeleteId]=useState(0)
    const [btn,setBtn]=useState("Add Course")
    const [showModal,setShowModal]=useState(false)
   
    const token=localStorage.getItem("access_token")
    const closeModal = () => {
        setShowModal(false)
        setCourseData({course_name: "",
          course_photo: "",
          tutor_name: "",
          tutor_email: "",
          tutor_contact: "",})
    }
    const [deleteModal,setdeleteModal]=useState(false)
    // const [data,setData]=useState([])
    const [serachTxt,setSearchTxt]=useState("")
     
    const closeDeleteModal = () => {
        setdeleteModal(false)
    }

    const editCourse = (data) => {
      setBtn("Save")
      setCourseData(data)
      setShowModal(true)
    }

    const viewCourse = (data) => {
      console.log(data)
      navigate('../view-course',{state:{'course_data':data}})
    }

    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {

      if(!token){
        console.log("no token")
      }
        try {
            const response = await fetch("http://127.0.0.1:8000/AdminUrls/retreiveCourses/", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${ token }`,
                }
            });

            const data = await response.json();
            setCourseDetails(data);
            setError(response);

        } catch (error) {
            console.log(error);
        }
    };

    const changeHandler = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
      e.preventDefault();
  
      // Create a new FormData instance to handle file uploads
      const formData = new FormData();
      formData.append('course_name', courseData.course_name);
      formData.append('course_photo', courseData.course_photo); // Send file
      formData.append('tutor_name', courseData.tutor_name);
      formData.append('tutor_email', courseData.tutor_email);
      formData.append('tutor_contact', courseData.tutor_contact);
  
      try {
          if (!token) {
              console.log("no token");
              navigate('/admin_home');
              return;
          }
  
          if (btn === "Add Course") {
              const response = await fetch("http://127.0.0.1:8000/AdminUrls/AddCourses/", {
                  method: "POST",
                  body: formData,
                  headers: {
                      Authorization: `Bearer ${token}`,
                  }
              });
  
              if (!response.ok) {
                  throw new Error("Failed to submit form");
              }
  
              // Handle success (e.g., reset form or show success message)
              console.log("Course added successfully!");
              setCourseData({
                  course_name: "",
                  course_photo: "",
                  tutor_name: "",
                  tutor_email: "",
                  tutor_contact: "",
              });
              setShowModal(false);
              fetchCourseData();
          }
  
          if (btn === "Save") {
              const response = await fetch(`http://127.0.0.1:8000/AdminUrls/updateCourses/${courseData.id}/`, {
                  method: "PUT",
                  body: formData,
                  headers: {
                      Authorization: `Bearer ${token}`,
                  }
              });
  
              if (!response.ok) {
                  throw new Error("Failed to submit form");
              }
  
              setCourseData({
                  course_name: "",
                  course_photo: "",
                  tutor_name: "",
                  tutor_email: "",
                  tutor_contact: "",
              });
              console.log("Course saved successfully!");
              setShowModal(false);
              fetchCourseData();
          }
      } catch (error) {
          console.log("Error:", error);
      }
  };
  
    const delCou = (id) => {
      setdeleteModal(true)
      setDeleteId(id)
    }

    const deletecourse = async(e) => {
      console.log("deltinggg")

      if(!token){
        console.log("no token")
      }
      try{
        const response=await fetch(`http://127.0.0.1:8000/AdminUrls/deleteCourse/${deleteId}/`,{
          method:"DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ token }`,
          }
        })
        console.log(response.data)
        setdeleteModal(false)

      }catch(error){
        console.log(error)
      }
    }
    


    useEffect(()=>{
         SearchCourses()
    },[serachTxt])
    
    const SearchCourses =async() => {

      try{

        const response=await fetch(`http://127.0.0.1:8000/AdminUrls/searchCourses?course_name=${serachTxt}`,{
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ token }`,
          }
        })
          const data=await response.json()
          console.log(data)
          setCourseDetails(data)

       

      }catch(e){
        console.log(e)
      }

    }


    return (
        <div className='course-box'>
             
             <div className='d-flex justify-content-between align-items-center'>

              <div className='d-flex'>
              <div className='me-3'><FaArrowLeft onClick={() => navigate('/admin_home')}/></div>
              <div><h4><u>COURSES:</u></h4></div>

              </div>
               
              <div> 

                <input type="search" placeholder='search by course' value={serachTxt} onChange={(e) => setSearchTxt(e.target.value) } />   
            
              </div>
              <div><button onClick={() => setShowModal(true)} className='login-btn' style={{width:'110%'}}>ADD COURSE</button></div>

                
                
             </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>COURSE NAME</th>
                        <th>TUTOR NAME</th>
                        
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {courseDetails.map((data, index) => (
                        <tr key={index}>
                            <td>{index +1}</td>
                            <td>{data.course_name}</td>
                            <td>{data.tutor_name}</td>
                            {/* <td>
                              <img src={data.course_photo} alt="course_photo"/>
                            </td> */}
                            <td>
                                
                                <span className='action' onClick={() => viewCourse(data)}><FaEye/></span>
                                <span className='action' onClick={() => editCourse(data)}><FaPen/></span>
                                <span className='action' onClick={() => delCou(data.id)}><FaTrash/></span>    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            

  
{showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Enter Course Details</h2>
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <div className='inputField'>
                <input
                  type="text"
                  name="course_name"
                  value={courseData.course_name}
                  placeholder="Course Name"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div className='inputField'>
                <input
                  type="file"
                  accept="image/*"
                  name="course_photo"
                  required
                  onChange={(e) =>
                    setCourseData({ ...courseData, course_photo: e.target.files[0] })
                  }
                />
              </div>
              <div className='inputField'>
                <input
                  type="text"
                  name="tutor_name"
                  value={courseData.tutor_name}
                  placeholder="Tutor Name"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div className='inputField'>
                <input
                  type="email"
                  name="tutor_email"
                  value={courseData.tutor_email}
                  placeholder="Tutor Email"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div className='inputField'>
                <input
                  type="text"
                  name="tutor_contact"
                  value={courseData.tutor_contact}
                  placeholder="Tutor Contact"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div className='inputField'>
                <button type="submit" value={btn}>{btn}</button>
                <button type="button" onClick={closeModal}>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

{deleteModal && (
        <div className='modal-overlay1' >
          <div className="modal-content1">
              <p>do you to delete</p>
              <div className='d-flex modal-btns'>
              <button  onClick={() => deletecourse()}>YES</button>
              <button  onClick={closeDeleteModal} style={{background:'red'}}>CANCEL</button>
              </div>
          </div>
        </div>
      )}


        </div>
    );
}

export default Courses;









