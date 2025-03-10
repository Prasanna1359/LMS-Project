import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-bootstrap';
import '../css/coursess.css';
import { FaEye ,FaPen,FaTrash } from 'react-icons/fa';
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
    const [token, setToken] = useState("");
    const [error, setError] = useState("");

    const [showModal,setShowModal]=useState(false)
    const closeModal = () => {
        setShowModal(false)
    }
    const [deleteModal,setdeleteModal]=useState(false)

    const closeDeleteModal = () => {
        setdeleteModal(false)
    }
    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/AdminUrls/retreiveCourses/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
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
            const response = await fetch("http://127.0.0.1:8000/AdminUrls/AddCourses/", {
                method: "POST",
                body: formData, // Send the FormData object (this includes file data)
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            // Handle success (e.g., reset form or show success message)
            console.log("Course added successfully!");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>COURSE NAME</th>
                        <th>TUTOR NAME</th>
                        <th>PHOTO</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {courseDetails.map((data, index) => (
                        <tr key={index}>
                            <td>{index +1}</td>
                            <td>{data.course_name}</td>
                            <td>{data.tutor_name}</td>
                            <td>{data.course_photo}</td>
                            <td>
                                
                                <span className='action' ><FaEye/></span>
                                <span className='action'><FaPen/></span>
                                <span className='action' onClick={() => setdeleteModal(true)}><FaTrash/></span>    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => setShowModal(true)}>ADD COURSE</button>

  
{showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <div>
                <input
                  type="text"
                  name="course_name"
                  value={courseData.course_name}
                  placeholder="Course Name"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div>
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
              <div>
                <input
                  type="text"
                  name="tutor_name"
                  value={courseData.tutor_name}
                  placeholder="Tutor Name"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="tutor_email"
                  value={courseData.tutor_email}
                  placeholder="Tutor Email"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="tutor_contact"
                  value={courseData.tutor_contact}
                  placeholder="Tutor Contact"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div>
                <button type="submit">ADD</button>
                <button type="button" onClick={closeModal}>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

{deleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
              <p>do you to delete</p>
              <button  onClick={deletecourse}>YES</button>
              
              <button  onClick={closeDeleteModal}>CANCEL</button>
          </div>
        </div>
      )}


        </div>
    );
}

export default Courses;
