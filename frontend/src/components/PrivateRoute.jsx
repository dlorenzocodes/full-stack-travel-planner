import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

function PrivateRoute() {

    const { loggedIn, checkingStatus } = useAuth()
    const location = useLocation()

    if(checkingStatus) return <Spinner />

    return loggedIn ? <Outlet /> : <Navigate to='/explore' state={{ from: location}} replace/>

}

export default PrivateRoute