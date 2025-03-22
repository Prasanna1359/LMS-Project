
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import SideBar from './SideBar';
import '../css/pageLayout.css';
import { useLocation } from 'react-router-dom';



const PageLayout = () => {
  const location = useLocation();
  const data = location.state?.user?.username || localStorage.getItem('user'); 
  const email = location.state?.user?.email || localStorage.getItem('email');
  const id = location.state?.user?.id || localStorage.getItem('id'); 


  localStorage.setItem('user', data);
  localStorage.setItem('email', email);
  localStorage.setItem('id', id); // Ensure username is stored

  return (
    <div className="topbar">
      <TopBar user={data} /> {/* Pass user as a prop */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <SideBar />
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;





