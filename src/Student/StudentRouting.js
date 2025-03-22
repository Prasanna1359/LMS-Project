import React from 'react'
import { Routes,Route } from "react-router-dom";
import StudentHomePage from './pages/StudentHomePage';

import StudentLogin from './pages/StudentLogin'
import StudentChangePassword from './pages/StudentChangePassword';
import StudentCourses from './pages/StudentCourses';
import ShowVideo from '../Admin/pages/ShowVideo';
import StudentViewCourse from './pages/StudentViewCourse';

function StudentRouting  () {
  return (
    <div>

        <Routes>
             <Route path="StudentLogin/" element={<StudentLogin/>}></Route>
             <Route path='student-home/' element={<StudentHomePage/>}>
                    <Route path='studentChangePassword/' element={<StudentChangePassword/>}></Route>
                    <Route path='StudentCourses/' element={<StudentCourses/>}></Route>
                    <Route path="view-course/" element={<StudentViewCourse/>}></Route> 
                     <Route path="view-video/" element={<ShowVideo/>}></Route> 
             



             </Route>
        </Routes>


    </div>
  )
}

export default StudentRouting