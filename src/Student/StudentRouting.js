import React from 'react'
import { Routes,Route } from "react-router-dom";
import StudentHomePage from './pages/StudentHomePage';

import StudentLogin from './pages/StudentLogin'
import StudentChangePassword from './pages/StudentChangePassword';
import StudentCourses from './pages/StudentCourses';
import ShowVideo from '../Admin/pages/ShowVideo';
import StudentViewCourse from './pages/StudentViewCourse';
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import StudentDashboard from "./pages/StudentDashboard"
import LogOut from "./pages/StudentLogOut"
import ProfilePage from './pages/ProfilePage';

function StudentRouting  () {
  return (
    <div>
       <AuthProvider>
        <Routes>
             <Route path="StudentLogin/" element={<StudentLogin/>}></Route>
             <Route path='student-home/' element={<PrivateRoute><StudentHomePage/></PrivateRoute>}>
                    <Route index element={<StudentDashboard/>}></Route>
                    <Route path='studentChangePassword/' element={<StudentChangePassword/>}></Route>
                    <Route path='StudentCourses/' element={<StudentCourses/>}></Route>
                    <Route path="view-course/" element={<StudentViewCourse/>}></Route> 
                     <Route path="view-video/" element={<ShowVideo/>}></Route> 
                     <Route path="profile/" element={<ProfilePage/>}></Route>
                     <Route path='logout/' element={<LogOut/>}></Route>
             



             </Route>
        </Routes>

        </AuthProvider>
    </div>
  )
}

export default StudentRouting