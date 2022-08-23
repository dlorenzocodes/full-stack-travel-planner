import axios from "axios"
import '../../config/initilaizeFirebase.js'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'


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


const addProfileImage = async (data) => {
    const response = await axios.post(
        '/users/profile',
        data,
        {
            headers: { 'Content-Type': 'multipart/form-data'},
            withCredentials: true
        }
    )

    return await response.data
}


const deleteProfileImage = async() => {
    const response = await axios.delete(
        '/users/profile/delete',
        { withCredentials: true }
    )

    return await response.data
}


const forgotPassword = async(email) => {
    const response = await axios.post(
        '/users/forgot-password',
        email,
        {
            headers: { 'Content-Type': 'application/json '},
            withCredentials: true
        }
    )

    return await response.data
}


const resetPassword = async (formData) => {
    const response = await axios.post(
        '/users/reset-password',
        formData,
        {
            headers: { 'Content-Type': 'application/json '},
            withCredentials: true
        }
    )

    return await response.data
}


const verifyToken = async (data) => {
    const response = await axios.post(
        '/users/verify-token',
        data,
        {
            headers: { 'Content-Type': 'application/json '},
            withCredentials: true
        }
    )

    return await response.data
}


const googleValidation = async() => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    try{

        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
    
        // eslint-disable-next-line
        const token = credential.accessToken
        const user = result.user
    
        const userData = { user: user.displayName, email: user.email }
        const response = await axios.post(
            '/auth/google',
            userData,
            {
                headers: { 'Content-Type': 'application/json '},
                withCredentials: true
            }
        )
        
        return await response.data

    }catch(err){
        throw new Error('Unsuccessfull google validation!')
    }

}

const authService = {
    register,
    login,
    getGoogleUrl,
    googleSignInFailure,
    getCurrentUser,
    logoutUser,
    addProfileImage,
    deleteProfileImage,
    forgotPassword,
    resetPassword,
    verifyToken,
    googleValidation
}

export default authService