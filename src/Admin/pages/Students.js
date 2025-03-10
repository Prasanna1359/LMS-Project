import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Courses() {
    const [studentData,setStudentData]=useState({
        "username":"",
        

    })

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

export default Courses;
