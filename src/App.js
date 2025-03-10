// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';

import AdminRouting from './Admin/AdminRouting.js';
// import AdminHome from './Admin/pages/AdminHome.jsx';
import AddAdminPage from './Admin/pages/AddAdminPage.js';
import VerifyOTP from './Admin/pages/VerifyOTP.js';
import Courses from './Admin/pages/courses.js';
import PageLayout from './Admin/pages/PageLayout.js';


function App() {
  return (
    <div>
      <BrowserRouter>
         <AdminRouting/>
      </BrowserRouter>
      
      

       {/* /* <BrowserRouter>
       <Routes>

      <Route path="/" element={<PageLayout />}>
        <Route path='courses' element={<Courses />} />
        <Route path="users" element={< VerifyOTP/>} />
        <Route path="settings" element={<AddAdminPage />} />
      </Route>
    </Routes>
       </BrowserRouter> */ }
    </div>
  );
}

export default App;
