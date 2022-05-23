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
    const response = await axios.get('/auth/google/url', { withCredentials: true })
    const url = await response.data
    window.open(url, '_self')
}

const googleSignInFailure = async () => {
    const response = await axios.get('/auth/google/failed', { withCredentials: true })
    return await response.data
}

const authService = {
    register,
    login,
    getGoogleUrl,
    googleSignInFailure
}

export default authService