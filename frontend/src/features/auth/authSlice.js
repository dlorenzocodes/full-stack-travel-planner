import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService'

const initialState = {
    user: null,
    isAccountCreated: false,
    isLoading: false,
    isLoginSuccess: false,
    isError: false,
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isLoginSuccess = false
            state.isAccountCreated = false
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
            .addCase(handleUserLogout.fulfilled, (state, action) => {
                state.user = null
                state.isLoginSuccess = false
            })
            .addCase(handleUserLogout.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer