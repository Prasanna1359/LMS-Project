import React from "react";
import { Route,Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import VerifyOTP from "./pages/VerifyOTP";
import AdminHome from "./pages/AdminHome";
import AddAdminPage from "./pages/AddAdminPage";
import Courses from "./pages/courses";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PageLayout from "./pages/PageLayout";
import ViewCourse from "./pages/ViewCourse";
import Students from "./pages/Students";
import ShowVideo from "./pages/ShowVideo";
import EnrolledStudents from "./pages/EnrolledStudents";
// import StudentLogin from "../Student/pages/StudentLogin";

function AdminRouting () {
  return (
    <div>
        
           <Routes>
               <Route path="/" element={<AdminLogin/>}></Route>
               <Route path="AdminLogin/" element={<AdminLogin/>}></Route>
               <Route path="verify_otp/" element={<VerifyOTP/>}></Route>
               <Route path="Forgot_password/" element={<ForgotPassword/>}></Route>
               <Route path="reset-password/" element={<ResetPassword/>}></Route>
               {/* <Route path="StudentLogin/" element={<StudentLogin/>}></Route> */}
               

               <Route path="admin_home/" element={<PageLayout />}>
                    <Route path="AddAdmin/" element={<AddAdminPage/>}></Route>
                    <Route path="courses/" element={<Courses />} ></Route>
                    <Route path="students/" element={<Students/>}></Route>
                    
                    <Route path="addAdmin/" element={<AddAdminPage />}></Route>
                    <Route path="view-course/" element={<ViewCourse/>}></Route>
                    <Route path="view-video/" element={<ShowVideo/>}></Route>
                    <Route path="enrolled-students/" element={<EnrolledStudents/>}></Route>


                    <Route path="students/" element={<Students/>}></Route>


                   

               </Route>

           </Routes>
        
    </div>
  )
}

export default AdminRouting