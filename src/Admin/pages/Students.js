import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Students() {
    const [StudentDetails,setStudentDetails]=useState("")
    const [error,setError]=useState("")


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
            <table border={2} className="table table-hover">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>course name</td>
                        <td>tutor name</td>
                    </tr>
                </thead>
                <tbody>
                    {courseDetails.map((data, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{data.course_name}</td>
                            <td>{data.tutor_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button>ADD COURSE</button>

            <div className="container">
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div><input type="text" name='username' value={} /></div>
                </form>
            </div>
        </div>
    );
}

export default Students;
