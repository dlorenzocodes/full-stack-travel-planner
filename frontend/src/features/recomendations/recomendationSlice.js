import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recomendationService from './recomendationService'

const initialState = {
    cities: null,
    attractions: null,
    isLoading: false,
    isError: false,
    message: ''
}

export const getCityRecomendations = createAsyncThunk(
    'recomendation/getCities',
    async(_, thunkAPI) => {
        try{
            return await recomendationService.getCityRecomendations()
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const recomendationSlice = createSlice({
    name: 'recomendation',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCityRecomendations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCityRecomendations.fulfilled, (state, action) => {
                state.isLoading = false
                state.cities = action.payload[0]
                state.attractions = action.payload[1]
            })
            .addCase(getCityRecomendations.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {} = recomendationSlice.actions
export default recomendationSlice.reducer

