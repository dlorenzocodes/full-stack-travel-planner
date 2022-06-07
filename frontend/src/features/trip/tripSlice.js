import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tripService from './tripService'

const initialState = {
    cityInfo: {},
    isLoading: false,
    isError: false,
    isCityActive: false,
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
        closeCityModal: (state) => {
            state.isCityActive = false
        },
        resetTripState: (state) => {
            state.isError = false
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
                state.isLoading = false
                state.isCityActive = true
                state.cityInfo = action.payload
            })
            .addCase(postDestination.rejected, (state, action) => {
                state.isCityActive = false
                state.isLoading = false
                state.isError = true
                state.message = action.payload || 'Invalid request!'
            })
    }
})

export const { closeCityModal, resetTripState } = tripSlice.actions
export default tripSlice.reducer