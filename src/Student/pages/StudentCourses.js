import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft,FaArrowRight } from 'react-icons/fa'
import "../css/StudentCourses.css"

function StudentCourses  () {
    const [coursesData,setCoursesData]=useState([])
    const email=localStorage.getItem("email")
    const token=localStorage.getItem("access_token")
    const [serachTxt,setSearchTxt]=useState("")
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
    

    
    
        // useEffect(()=>{
        //      SearchCourses()
        // },[serachTxt])
        
        // const SearchCourses =async() => {
    
        //   try{
    
        //     const response=await fetch(`http://127.0.0.1:8000/AdminUrls/searchCourses?course_name=${serachTxt}`,{
        //       method:"GET",
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${ token }`,
        //       }
        //     })
        //       const data=await response.json()
        //       console.log(data)
        //       setCoursesData(data)
    
           
    
        //   }catch(e){
        //     console.log(e)
        //   }
    
        // }






  return (
    <div className='course-body'>

       <div className='d-flex'>
           <div className='me-3'><FaArrowLeft onClick={() => navigate('/student-home')}/></div>
           <div><h4>ENROLLED COURSES:</h4></div>

           {/* <input type="search" placeholder='search by course' value={serachTxt} onChange={(e) => setSearchTxt(e.target.value) } />    */}
            
      
       </div>



        <div className='display-courses'> 

          {
            coursesData.map((course,index) => (
              <div className='course-image-container'>
                  <div className='course-image'>
                    <img src={`http://127.0.0.1:8000/${course.course_photo}`} alt={course.course_name} />
                  </div>
                  <div className='text d-flex '>
                    <div>{course.course_name}</div>
                    <div className='ms-5'><FaArrowRight onClick={() => viewCourse(course)}/></div>
                  </div>
                  
              </div>
            ))
          }
             
        </div>


<div>

</div>

    </div>
  )
}

export default StudentCourses