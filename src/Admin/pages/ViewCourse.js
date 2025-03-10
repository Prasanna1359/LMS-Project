import React from 'react'
import { useLocation } from 'react-router-dom'

function ViewCourse  () {
    const location=useLocation()
    const data=location.state?.course_data
    console.log(data)
  return (
    <div>
      <h1>{data.course_name}</h1>
      <img src={`http://127.0.0.1:8000${data.course_photo}`} alt={data.course_name} style={{ width: "200px" }} />
      <p>Instructor: {data.tutor_name}</p>
      <p>Email: {data.tutor_email}</p>
      <p>Contact: {data.tutor_contact}</p>
    </div>
  )
}

export default ViewCourse