import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import UpdateTrip from './pages/UpdateTrip';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword'
import PrivateRoute from './components/PrivateRoute'
import PersistLogin from './components/PersistLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <div className='main-container'>
            <Routes>
              <Route path='/explore' element={ <Explore />} />
              <Route path='/login' element={ <Login />} />
              <Route path='/register' element={ <SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />

              <Route element={ <PersistLogin /> }>

                <Route path='/' element={ <PrivateRoute /> }>
                  <Route path='/' element={ <Home /> } />
                </Route>

                <Route path='/profile' element={ <PrivateRoute /> } >
                  <Route path='/profile' element={ <Profile /> } />
                </Route>

                <Route  exact path='/trips/:tripId' element={<PrivateRoute />}>
                  <Route exact path='/trips/:tripId' element={<UpdateTrip />} />
                </Route>

              </Route>

              <Route path='*' element={ <NotFound /> } />

            </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
