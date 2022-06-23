import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tripService from './tripService'

const initialState = {
    cityInfo: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    Flights: [],
    Cars:[],
    Lodging: [],
    Other: [],
    Notes: [],
    Itinerary: [],
    Expenses: []
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

export const saveTrip = createAsyncThunk(
    'trip/postTrip',
    async(tripData, thunkAPI) => {
        try{
            return await tripService.saveTrip(tripData)
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
            state.Flights = []
            state.Cars = []
            state.Lodging = []
            state.Other = []
            state.Notes = []
            state.Itinerary = []
            state.Expenses = []

        },
        addFlightReservation: (state, action) => {
            state.Flights.push(action.payload)
        },
        addHotelReservation: (state, action) => {
            state.Lodging.push(action.payload)
        },
        addOtherReservation: (state, action) => {
            state.Other.push(action.payload)
        },
        addNoteReservation: (state, action) => {
            state.Notes.push(action.payload)
        },
        addCarReservation: (state, action) => {
            state.Cars.push(action.payload)
        },
        addItinerary: (state, action) => {
            state.Itinerary.push(action.payload)
        },
        addActivityToItinerary: (state, action) => {
            const { activity, time } = action.payload
            const indexData = action.payload.index
            const itinerary = state.Itinerary.find((item, index) => indexData === index)
            itinerary.activities.push({ activity, time})
        },
        addExpenses: (state, action) => {
            state.Expenses.push(action.payload)
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
            .addCase(saveTrip.pending, (state) => {
                state.isLoading = true
            })
            .addCase(saveTrip.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(saveTrip.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export const { 
    resetTripState, 
    addFlightReservation,
    addHotelReservation,
    addOtherReservation,
    addNoteReservation,
    addCarReservation,
    addItinerary,
    addActivityToItinerary,
    addExpenses
} = tripSlice.actions
export default tripSlice.reducer