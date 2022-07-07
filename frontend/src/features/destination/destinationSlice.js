import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import destinationService from './destinationService'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    cityInfo: {},
    message: ''
}

export const postDestination = createAsyncThunk(
    'trip/postDestination',
    async(city, thunkAPI) => {
        try{
            return await destinationService.postCityDestination(city)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)


const destinationSlice = createSlice({
    name: 'destination',
    initialState,
    reducers: {
        resetDestinationState: (state) => initialState
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
                state.message = action.payload || 'Request could not be processed!'
            })
    }
})

export const { resetDestinationState } = destinationSlice.actions
export default destinationSlice.reducer