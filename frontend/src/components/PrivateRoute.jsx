import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PrivateRoute() {

    const { loggedIn, checkingStatus } = useAuth()
    const location = useLocation()

    if(checkingStatus) return <p>Loading...</p>

    return loggedIn ? <Outlet /> : <Navigate to='/explore' state={{ from: location}} replace/>

}

export default PrivateRoute