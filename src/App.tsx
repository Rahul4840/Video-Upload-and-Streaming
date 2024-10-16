import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import { VideoHome } from './video-components/video-home';
import { AdminLogin } from './video-components/admin-login';
import { AdminDashboard } from './video-components/admin-dashboard';
import { AdminError } from './video-components/admin-error';
import { AddVideo } from './video-components/add-video';
import { EditVideo } from './video-components/edit-video';
import { UserRegister } from './video-components/user-register';
import { UserLogin } from './video-components/user-login';
import { UserDashboard } from './video-components/user-dashboard';
import { VideoCategory } from './video-components/video-category';

function App() {
  return (
    <div className="container-fluid">
        <BrowserRouter>
            <header className='bg-dark text-center text-white p-3 m-1 fs-4 fw-bold d-flex justify-content-between'><span>Video Library Project</span> <Link to='/user-login' className='bi bi-person-fill text-white text-decoration-none'>User Login</Link></header>
            <section className='justify-content-center' style={{height:'100vh'}}>
              <Routes>
                <Route path='/' element={<VideoHome />} />
                <Route path='admin-login' element={<AdminLogin/>} />
                <Route path='admin-dashboard' element={<AdminDashboard />} />
                <Route path='error' element={ <AdminError />} />
                <Route path='add-video' element={<AddVideo />} />
                <Route path='edit-video/:id' element={<EditVideo />} />
                <Route path='user-register' element={<UserRegister />} />
                <Route path='user-login' element={<UserLogin />} />
                <Route path='user-dashboard' element={<UserDashboard />} />
                <Route path='video-category' element={<VideoCategory />} />
              </Routes>
            </section>
        </BrowserRouter>
    </div>
  );
}

export default App;
