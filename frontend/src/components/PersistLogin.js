import { Outlet } from "react-router-dom";
import { useEffect } from 'react'
import useAuth from "../hooks/useAuth"
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../features/auth/authSlice'

function PersistLogin() {
    const { loggedIn } = useAuth()
    const dispatch = useDispatch()

    console.log(loggedIn)

    useEffect(() => {

        if(!loggedIn) dispatch(getCurrentUser())

    }, [loggedIn, dispatch])

    return (
        loggedIn ? <Outlet /> : <p>Loading...</p>
    )
}

export default PersistLogin