import authService from './authService'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAccountCreated: false,
    isLoading: false,
    isLoginSuccess: false,
    isError: false,
    isSuccess: false,
    isTokenValid: false,
    message: ''
}

// Register new users
export const register = createAsyncThunk(
    'auth/RegisterUser',
    async (userData, thunkAPI) => {
        try{
            return await authService.register(userData)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Login users
export const login = createAsyncThunk(
    'auth/LoginUser',
    async(userData, thunkAPI) => {
        try{
            return await authService.login(userData)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Login user via Google
export const getGoogleSignUrl = createAsyncThunk(
    'auth/getGoogleUrl',
    async(_, thunkAPI) => {
        try{
            return await authService.getGoogleUrl()
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const googleSignInFailure = createAsyncThunk(
    'auth/googleSignInFailure',
    async(_, thunkAPI) => {
        try{
            return await authService.googleSignInFailure()
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get current user
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async(_, thunkAPI) => {
        try{
            return await authService.getCurrentUser()
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Logout user
export const handleUserLogout = createAsyncThunk(
    'auth/LogoutUser',
    async(_, thunkAPI) => {
        try{
            return await authService.logoutUser()
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Add profile image
export const handleProfileImage = createAsyncThunk(
    'auth/addProfileImage',
    async(data, thunkAPI) => {
        try{
            return await authService.addProfileImage(data)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete profile image
export const deleteProfileImage = createAsyncThunk(
    'auth/deleteProfileImage',
    async(_, thunkAPI) => {
        try{
            return await authService.deleteProfileImage()
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Forgot Password
export const handleForgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async(email, thunkAPI) => {
        try{
            return await authService.forgotPassword(email)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Reset Password
export const handleResetPassword = createAsyncThunk(
    'auth/resetPassword',
    async(formData, thunkAPI) => {
        try{
            return await authService.resetPassword(formData)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const handleTokenVerification = createAsyncThunk(
    'auth/verifyToken',
    async(data, thunkAPI) => {
        try{
            return await authService.verifyToken(data)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const googleTest = createAsyncThunk(
    'auth/googleTest',
    async(_, thunkAPI) => {
        try{
            return await authService.testingGoogle()
        }catch(err){
            let message

            if(err.response.data !== undefined) return message = err.response.data.message
            message = err
            return thunkAPI.rejectWithValue(message)
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isLoginSuccess = false
            state.isAccountCreated = false
            state.isSuccess =  false
            state.isTokenValid = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isAccountCreated = true
                state.message = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoginSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(googleSignInFailure.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoginSuccess = true
                state.user = action.payload
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.isLoginSuccess = false
                state.user = null
            })
            .addCase(handleUserLogout.fulfilled, (state, action) => {
                state.user = null
                state.isLoginSuccess = false
            })
            .addCase(handleUserLogout.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(handleProfileImage.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProfileImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProfileImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(deleteProfileImage.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(handleForgotPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(handleForgotPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(handleForgotPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(handleResetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(handleResetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload
            })
            .addCase(handleResetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(handleTokenVerification.pending, (state) => {
                state.isLoading = true
            })
            .addCase(handleTokenVerification.fulfilled, (state, action) => {
                state.isLoading = false
                if(action.payload.isTokenValid){
                    state.isTokenValid = action.payload.isTokenValid
                }
            })
            .addCase(handleTokenVerification.rejected, (state, action) => {
                state.isLoading =  false
                state.isTokenValid = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(googleTest.fulfilled, (state, action) => {
                state.isLoginSuccess = true
                state.user = action.payload
            })
            .addCase(googleTest.rejected, (state, action) => {
                state.isLoginSuccess = false
                state.isError = true
                state.message = action.payload || 'Unsuccessfull google validation!'
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer