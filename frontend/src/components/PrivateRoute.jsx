import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

function PrivateRoute() {

    const { loggedIn, checkingStatus } = useAuth()
    const location = useLocation()

    if(checkingStatus) return <Spinner />

    return loggedIn ? <Outlet /> : <Navigate to='/explore' state={{ from: location}} replace/>

}

export default PrivateRoute