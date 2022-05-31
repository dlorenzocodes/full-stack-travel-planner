import { Outlet } from "react-router-dom";
import { useEffect } from 'react'
import useAuth from "../hooks/useAuth"
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../features/auth/authSlice'
import Explore from '../pages/Explore'

function PersistLogin() {
    const { loggedIn, checkingStatus } = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {

        if(!loggedIn) dispatch(getCurrentUser())

    }, [loggedIn, dispatch])

    if(checkingStatus) return <p>Loading... </p>

    return (
        loggedIn ? <Outlet /> : <Explore />
    )
}

export default PersistLogin