import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-bootstrap';
import { FaEye ,FaPen,FaTrash } from 'react-icons/fa';
import axios from 'axios';
import "../css/coursess.css";

function Students() {

    const [studentData,setStudentData]=useState({
        "username":"",
        "email":"",
        "courses":"",
        "password":"",
        "joined_date":"",
        "end_date":""

    })
    const [StudentDetails,setStudentDetails]=useState([])
    const [error,setError]=useState("")
    
    const [showModal,setShowModal]=useState(false)


    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

  
    useEffect(() => {
        axios.get("http://localhost:8000/AdminUrls/courses/")
            .then(response => setCourses(response.data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    
    

    const handleCourseSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCourses(selectedOptions);
    };

    
    const changeHandler = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

     useEffect(() => {
            fetchStudentData();
        }, []);
    
        const fetchStudentData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/AdminUrls/retreiveStudents/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                const data = await response.json();
                setStudentDetails(data);
                setError(response);
            } catch (error) {
                console.log(error);
            }
        };
    

    return (
        <div>


                <div className='d-flex justify-content-between align-items-center'>

                <div><h4><u>STUDENTS:</u></h4></div>
                <div></div>
                <div><button onClick={() => setShowModal(true) } className='login-btn' style={{width:'110%'}}>Add Student</button></div>

                
                
                </div>



            <table border={2} className="table table-hover">
                <thead>
                    <tr>
                       <th>username</th>
                       <th>email</th>
                       <th>courses</th>
                       <th>joined date</th>
                       <th>end date</th>
                       <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {StudentDetails.map((data, index) => (
                        <tr key={index}>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data.course}</td>
                            <td>{data.joined_date}</td>
                            <td>{data.end_date}</td>
                            <td>
                                <span className='action' ><FaEye/></span>
                                <span className='action' ><FaPen/></span>
                                <span className='action' ><FaTrash/></span>    
                                                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            
  
{showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Enter Student Details</h2>
            <form>
              <div className='inputField'>
                <input
                  type="text"
                  name="username"
                  value={studentData.username}
                  placeholder="Name"
                  required
                  onChange={changeHandler}
                />
              </div>

              <div className='inputField'>
                <input
                  type="email"
                  name="email"
                  value={studentData.email}
                  placeholder="Email"
                  required
                  onChange={changeHandler}
                />
              </div>

              <div className='inputField'>
                <input
                  type="password"
                  name="password"
                  value={studentData.password}
                  placeholder="Password"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div className='inputField'>
              <select multiple value={selectedCourses} onChange={handleCourseSelection}>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.course_name}</option>
                    ))}
                </select>
                </div>


            <div className='inputField'>
                <input
                  type="date"
                  name="joined_date"
                  value={studentData.joined_date}
                  placeholder="Joined Date"
                  required
                  onChange={changeHandler}
                />
              </div>

              <div className='inputField'>
                <input
                  type="date"
                  name="end_date"
                  value={studentData.end_date}
                  placeholder="End Date"
                  required
                  onChange={changeHandler}
                />
              </div>

              <div className='d-flex'>
                <button type='submit'>ADD</button>
                <button onClick={setShowModal(false)}>CANCEL</button>
              </div>
              
              
             
              
            
            </form>
          </div>
        </div>
      )}

            </div>
    );
}

export default Students;
