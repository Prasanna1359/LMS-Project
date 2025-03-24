import React, {useState,useEffect}from 'react'
import learn from "../../Admin/pages/assests/learn.jpg"
import "../../Admin/css/AdminDashboard.css"
// ../../Admin/css/AdminHome.css
import { useNavigate } from 'react-router-dom'

function StudentDashboard  ()  {
  const navigate=useNavigate()
   const [courseDetails, setCourseDetails] = useState([]);
   const token=localStorage.getItem("access_token")
   const [studentDetails, setStudentDetails] = useState([]);
   

    useEffect(() => {
          fetchCourseData();
          fetchStudentData();
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
             
  
          } catch (error) {
              console.log(error);
          }
      };


      const fetchStudentData = async () => {
        if (!token) {
            console.log("no token");
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/AdminUrls/retreiveStudents/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (Array.isArray(data)) {
                setStudentDetails(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div className="dashboard-container">
    <h1 className="txt">Welcome to LMS Project !!!</h1>

    {/* Image with Overlay Text */}
    <div className="image-container">
      <img src={learn} alt="Learn" className="background-image" />
      <div className="overlay-text">Start Learning from Today</div>
    </div>

    {/* Statistics Boxes  */}
    {/* <div className="stats-container">
      <div className="stat-box" onClick={() => navigate("./courses")}>
        <h4>Total Courses</h4>
        <p>{courseDetails.length}</p> 
      </div>

      <div className="stat-box" onClick={() => navigate("./students")}>
        <h4>Total Students</h4>
        <p>{studentDetails.length}</p>
       </div>
     </div> */}
   </div>
  )
}

export default StudentDashboard