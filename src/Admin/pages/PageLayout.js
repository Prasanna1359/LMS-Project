
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import SideBar from './SideBar';

const PageLayout = () => {
  return (
    <div>
      <TopBar />
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
