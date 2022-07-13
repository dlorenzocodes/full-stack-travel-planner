import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import UpdateTrip from './pages/UpdateTrip';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

              <Route element={ <PersistLogin /> }>

                <Route path='/' element={ <PrivateRoute /> }>
                  <Route path='/' element={ <Home /> } />
                </Route>

                <Route path='/profile' element={ <PrivateRoute /> } >
                  <Route path='/profile' element={ <Profile /> } />
                </Route>

                <Route path='/trips/:tripId' element={<PrivateRoute />}>
                  <Route path='/trips/:tripId' element={<UpdateTrip />} />
                </Route>

              </Route>

            </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
