import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft,FaEye } from 'react-icons/fa'

function StudentCourses  () {
    const [coursesData,setCoursesData]=useState([])
    const email=localStorage.getItem("email")
    const token=localStorage.getItem("access_token")
    const navigate=useNavigate()
    useEffect(() => {
        
        fetchCourses();
        
    },[])

    const fetchCourses = async() =>{

        if(!token){
            console.log("no token")
          }


          try{
            const response=await fetch(`http://127.0.0.1:8000/AdminUrls/searchCoursesData?email=${email}`,{
              method:"GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`,
              }
            })
              const data=await response.json()
              console.log(data)
              setCoursesData(data)
      
          }catch(e){
            console.log(e)
          }


    }

    const viewCourse =(data) =>{
      navigate('../view-course',{state:{'course_data':data}})
    }
    
  return (
    <div>

       <div className='d-flex'>
          <div className='me-3'><FaArrowLeft onClick={() => navigate('/student-home')}/></div>
           <div><h4>ENROLLED COURSES:</h4></div>
      
       </div>

      

<table className="mt-5 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Course Name</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.map((course, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{course.course_name}</td>
                <td className="border p-2"><FaEye onClick={() => viewCourse(course)}/></td>
              </tr>
            ))}
          </tbody>
        </table>


<div>

</div>

    </div>
  )
}

export default StudentCourses