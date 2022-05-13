import axios from "axios"


const register = async (userData) => {
    const response = await axios.post('/users/', userData)
    return response.data
}

const login = async (userData) => {
    const response = await axios.post('/users/login', userData, { withCredentials: true })
    return response.data
}

const authService = {
    register,
    login
}

export default authService