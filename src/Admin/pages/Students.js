import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash, FaArrowLeft } from 'react-icons/fa';
import "../css/coursess.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Students() {
    const [studentData, setStudentData] = useState({
        "student_name": "",
        "email": "",
        "course_name": [],
        "password": "",
        "joined_date": "",
        "end_date": ""
    });
    console.log(studentData, "student data");
    const navigate = useNavigate();
    const [studentDetails, setStudentDetails] = useState([]);
    console.log(studentDetails,"studentDetails")
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [courses, setCourses] = useState([]);
    const [btn, setBtn] = useState("Add Student");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const token = localStorage.getItem("access_token");

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "course_name") {
            const selectedCourses = Array.from(e.target.selectedOptions, option => option.value);
            console.log("Selected Courses:", selectedCourses);
            setStudentData({ ...studentData, [name]: selectedCourses });
        } else {
            setStudentData({ ...studentData, [name]: value });
        }
    };

    useEffect(() => {
        fetchStudentData();
        fetchCourses();
    }, []);

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
            } else {
                setError("Student data is not in the expected format");
            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch student data");
        }
    };

    const fetchCourses = async () => {
        if (!token) {
            console.log("no token");
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/AdminUrls/retreiveCourses/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.log(error);
            setError("Failed to fetch courses");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting student data:", studentData);
        console.log("Current button state:", btn);

        try {
            if (!token) {
                console.log("no token");
                return;
            }

            if (btn === "Add Student") {
                const formData = new FormData();
                formData.append('username', studentData.student_name);
                formData.append('email', studentData.email);
                formData.append('password', studentData.password);
                formData.append('confirm_password', studentData.password);
                formData.append('panel', "student");

                try {
                    const response = await axios.post("http://127.0.0.1:8000/AdminUrls/AdminRegister/", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
                console.log(studentData,"edfghiuytrewsdcfvgbnjm")
                const response = await fetch("http://127.0.0.1:8000/AdminUrls/student-data/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body:JSON.stringify(studentData)
                    // body: JSON.stringify({
                    //     ...studentData,
                    //     course_name: studentData.course_name.map(course_name => course_name)
                    // })
                });
                // courseId => ({ id: courseId })

                setStudentData({
                    "student_name": "",
                    "email": "",
                    "course_name": [],
                    "password": "",
                    "joined_date": "",
                    "end_date": ""
                });

                if (!response.ok) {
                    throw new Error("Failed to add student");
                }
            } else if (btn === "Save") {
                console.log("update id", updateId);
                const response = await fetch(`http://127.0.0.1:8000/AdminUrls/updateStudent/${updateId}/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...studentData,
                        course_name: studentData.course_name.map(courseId => ({ id: courseId }))
                    })
                });

                setStudentData({
                    "student_name": "",
                    "email": "",
                    "course_name": [],
                    "password": "",
                    "joined_date": "",
                    "end_date": ""
                });

                if (!response.ok) {
                    throw new Error("Failed to update student");
                }
            }

            setShowModal(false);
            fetchStudentData(); // Refresh the student data
        } catch (error) {
            console.log(error);
            setError("Failed to submit form");
        }
    };

    const editStudent = (data) => {
        setShowModal(true);
        setStudentData(data);
        setBtn("Save");
        setUpdateId(data.id);
        console.log(data);
        console.log(data.id);
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
    };

    const deleteStu = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
        fetchStudentData();
    };

    const deleteStudent = async (e) => {
        console.log("Deleting...");
        try {
            const response = await fetch(`http://127.0.0.1:8000/AdminUrls/deleteStudent/${deleteId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);
            setDeleteModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='students'>
            <div className='d-flex justify-content-between align-items-center'>
                <div><FaArrowLeft onClick={() => navigate('/admin_home')} /></div>
                <div><h4><u>STUDENTS:</u></h4></div>
                <div></div>
                <div><button onClick={() => setShowModal(true)} className='login-btn' style={{ width: '110%' }}>Add Student</button></div>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Courses</th>
                        <th>Joined Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studentDetails.map((data, index) => (
                        <tr key={index}>
                            <td>{data.student_name}</td>
                            <td>{data.email}</td>
                            <td>{data.course_name.join(',')}</td>
                            <td>{data.joined_date}</td>
                            <td>{data.end_date}</td>
                            <td>
                                <span className='action' onClick={() => editStudent(data)}><FaPen /></span>
                                <span className='action' onClick={() => deleteStu(data.id)}><FaTrash /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Enter Student Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='inputField'>
                                <input
                                    type="text"
                                    name="student_name"
                                    value={studentData.student_name}
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

                            <div className='inputField' style={{ width: '100%' }}>
                                <select
                                    name="course_name"
                                    multiple
                                    value={studentData.course_name}
                                    onChange={changeHandler}
                                    required
                                >
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.course_name}>
                                            {course.course_name}
                                        </option>
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

                            <div className='inputField'>
                                <button type="submit">{btn}</button>
                                <button type="button" onClick={() => setShowModal(false)}>CANCEL</button>
                            </div>

                            <p>{error}</p>
                        </form>
                    </div>
                </div>
            )}

            {deleteModal && (
                <div className='modal-overlay1'>
                    <div className="modal-content1">
                        <p>Do you want to delete?</p>
                        <div className='d-flex modal-btns'>
                            <button onClick={() => deleteStudent()}>YES</button>
                            <button onClick={closeDeleteModal} style={{ background: 'red' }}>CANCEL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;
