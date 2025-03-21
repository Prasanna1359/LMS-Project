import React from 'react'
import { Routes,Route } from "react-router-dom";
import StudentHomePage from './pages/StudentHomePage';

import StudentLogin from './pages/StudentLogin'

function StudentRouting  () {
  return (
    <div>

        <Routes>
             <Route path="StudentLogin/" element={<StudentLogin/>}></Route>
             <Route path='student-home/' element={<StudentHomePage/>}>
             



             </Route>
        </Routes>


    </div>
  )
}

export default StudentRouting