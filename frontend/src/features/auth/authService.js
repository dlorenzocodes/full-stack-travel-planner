import axios from "axios"


const register = async (userData) => {
    const response = await axios.post('/users/', userData)
    return await response.data
}

const login = async (userData) => {
    const response = await axios.post('/users/login', userData, { withCredentials: true })
    return await response.data
}

const getGoogleUrl = async() => {
    const response = await axios.get('/auth/google/url', { 
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true 
        })
    const url = await response.data
    window.open(url, '_self')
}

const googleSignInFailure = async () => {
    const response = await axios.get('/auth/google/failed', { withCredentials: true })
    return await response.data
}

const getCurrentUser = async () => {
    const response = await axios.get('/users/me', { 
        headers: { 'Content-Type': 'application/json'  }, 
        withCredentials: true 
    })
    return await response.data
}

const logoutUser = async () => {
    const response = await axios.get('/users/logout', { withCredentials: true })
    return await response.data
}

const authService = {
    register,
    login,
    getGoogleUrl,
    googleSignInFailure,
    getCurrentUser,
    logoutUser
}

export default authService