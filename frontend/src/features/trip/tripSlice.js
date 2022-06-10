import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tripService from './tripService'

const initialState = {
    cityInfo: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const postDestination = createAsyncThunk(
    'trip/postDestination',
    async(city, thunkAPI) => {
        try{
            return await tripService.postCityDestination(city)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        resetTripState: (state) => {
            state.cityInfo = {}
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postDestination.pending, (state) => {
                state.isLoading = true
            })
            .addCase(postDestination.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.isError = false
                state.cityInfo = action.payload
            })
            .addCase(postDestination.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload || 'Invalid request!'
            })
    }
})

export const { resetTripState } = tripSlice.actions
export default tripSlice.reducer