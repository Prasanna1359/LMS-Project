import React ,{useState,useEffect} from 'react'
import "../css/coursess.css"
import { useNavigate } from 'react-router-dom';
import {FaArrowLeft } from 'react-icons/fa';


function EnrolledStudents () {
    const [StudentDetails, setStudentDetails] = useState([]);
    const [error,setError]=useState("")
    const token=localStorage.getItem("access_token")
    const navigate=useNavigate()
    useEffect(() => {
            fetchStudentData();
            
        }, []);
    
        const fetchStudentData = async () => {

            if(!token){
                console.log("no token")
            }

            try {
                const response = await fetch("http://127.0.0.1:8000/AdminUrls/retreiveStudents/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ token }`,
                      }
                });
                

                

                const data = await response.json();
                console.log(data)
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
    
  return (
    <div className='students '>
        <div className='d-flex  '>
        <div className='me-3'><FaArrowLeft onClick={() => navigate('/admin_home')}/></div>
        
         <div><h4><u>ENROLLED STUDENTS:</u></h4></div>

        </div>
        

          <table  className="table table-hover">
                        <thead>
                            <tr>
                                <th>username</th>
                                <th>email</th>
                                <th>courses</th>
                                <th>joined date</th>
                                <th>end date</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {StudentDetails.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.student_name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.course_display.join(', ')}</td>

                                    {/* <td>{Array.isArray(data.course_name.join) ? data.course_name.join.join(", ") : data.course_name}</td> */}

                                    <td>{data.joined_date}</td>
                                    <td>{data.end_date}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>


    </div>
  )
}

export default EnrolledStudents