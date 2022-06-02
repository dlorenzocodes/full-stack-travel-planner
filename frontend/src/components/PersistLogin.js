import Spinner from './Spinner';
import { useEffect } from 'react'
import useAuth from "../hooks/useAuth"
import Explore from '../pages/Explore'
import { useDispatch } from 'react-redux'
import { Outlet } from "react-router-dom";
import { getCurrentUser } from '../features/auth/authSlice'

function PersistLogin() {
    const { loggedIn, checkingStatus } = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {

        if(!loggedIn) dispatch(getCurrentUser())

    }, [loggedIn, dispatch])

    if(checkingStatus) return <Spinner />

    return (
        loggedIn ? <Outlet /> : <Explore />
    )
}

export default PersistLogin