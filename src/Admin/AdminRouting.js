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


function AdminRouting () {
  return (
    <div>
        
           <Routes>
               <Route path="/" element={<Courses/>}></Route>
               <Route path="AdminLogin/" element={<AdminLogin/>}></Route>
               <Route path="verify_otp/" element={<VerifyOTP/>}></Route>
               {/* <Route path="admin_home/" element={<AdminHome/>}></Route> */}
               <Route path="AddAdmin/" element={<AddAdminPage/>}></Route>
               {/* <Route path="courses/" element={<Courses/>}></Route> */}
               <Route path="Forgot_password/" element={<ForgotPassword/>}></Route>
               <Route path="reset-password/" element={<ResetPassword/>}></Route>
               <Route path="admin_home/" element={<PageLayout />}></Route>
               <Route path='courses/' element={<Courses />} />
               <Route path="users/" element={< VerifyOTP/>} />
               <Route path="settings/" element={<AddAdminPage />}></Route>

           </Routes>
        
    </div>
  )
}

export default AdminRouting