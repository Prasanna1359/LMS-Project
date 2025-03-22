
// import { Outlet } from 'react-router-dom';
// import StudentTopBar from './StudentTopBar';
// import StudentSideBar from './StudentSideBar';
// import '../../Admin/css/AdminHome.css'
// import { useLocation } from 'react-router-dom';

// const StudentHomePage = () => {
//     const location = useLocation();
//   const data = location.state?.user?.username || localStorage.getItem("username"); // Use fallback

//   localStorage.setItem("username", data);
  
//     return (
//         <div className='topbar'>
//             <StudentTopBar user={data} />
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
//                         <StudentSideBar />
//                     </div>
//                     <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//                         <Outlet />
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
//   };
  
//   export default StudentHomePage;


import { Outlet } from 'react-router-dom';
import StudentTopBar from './StudentTopBar';
import StudentSideBar from './StudentSideBar';
import '../../Admin/css/AdminHome.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const StudentHomePage = () => {
  const location = useLocation();
  const data = location.state?.user?.username || localStorage.getItem('user'); 
  const email = location.state?.user?.email || localStorage.getItem('email');
  const id = location.state?.user?.id || localStorage.getItem('id'); // Use fallback
   // Use fallback
  
  const [sidebarVisible, setSidebarVisible] = useState(false);

  localStorage.setItem('user', data);
  localStorage.setItem('email', email);
  localStorage.setItem('id', id);


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="topbar">
        <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <StudentTopBar user={data} />
      
      <div className="container-fluid">
        <div className="row">
          <div className={`col-md-3 col-lg-2 d-md-block bg-light sidebar ${sidebarVisible ? 'show' : ''}`}>
            <StudentSideBar />
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
