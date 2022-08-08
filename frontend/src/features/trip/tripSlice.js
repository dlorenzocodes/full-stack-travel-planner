import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tripService from './tripService'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isDeleted: false,
    isUpdated: false,
    tripTitle: null,
    image: null,
    dates: {},
    message: '',
    Flights: [],
    Cars:[],
    Lodging: [],
    Other: [],
    Notes: [],
    Itinerary: [],
    Expenses: [],
    Upcoming: [],
    Ongoing: [],
    Past: [],
    pagination: null
}


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

export const getTrips = createAsyncThunk(
    'trip/getTrips',
    async(paginationNumber, thunkAPI) => {
        try{
            return await tripService.getTrips(paginationNumber)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteTrip = createAsyncThunk(
    'trip/deleteTrip',
    async(tripId, thunkAPI) => {
        try{
            return await tripService.deleteTrip(tripId)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const updateTrip = createAsyncThunk(
    'trip/updateTrip',
    async(data, thunkAPI) => {
        try{
            return await tripService.updateTrip(data)
        }catch(err){
            const message = err.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const getTrip = createAsyncThunk(
    'trip/getTrip',
    async(tripId, thunkAPI) => {
        try{
            return await tripService.getTrip(tripId)
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
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.isDeleted = false
            state.isUpdated = false
            state.tripTitle = null
            state.image = null
            state.dates = {}
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
        removeItinerary: (state, action) => {
            const indexData = action.payload
            const newItinerary = state.Itinerary.filter((item, index) => index !== indexData)
            state.Itinerary = newItinerary
        },
        addActivityToItinerary: (state, action) => {
            const { activity, time } = action.payload
            const indexData = action.payload.index
            const itinerary = state.Itinerary.find((item, index) => indexData === index)
            itinerary.activities.push({ activity, time})
        },
        addExpenses: (state, action) => {
            state.Expenses.push(action.payload)
        },
        addEditedExpense: (state, action) => {
            const indexData = action.payload.expenseIndex
            const editedExpense = action.payload.expense
            state.Expenses.splice(indexData, 1, editedExpense)
        },
        removeExpense: (state, action) => {
            state.Expenses.splice(action.payload, 1)
        },
        addEditedActivity: (state, action) => {
            const activityIndex = action.payload.activityIndex
            const itineraryIndex = action.payload.itineraryIndex
            const data = action.payload.formData
            state.Itinerary[itineraryIndex].activities.splice(activityIndex, 1, data)
        },
        removeActivity: (state, action) => {
            const activityIndex = action.payload.activityIndex
            const itineraryIndex = action.payload.itineraryIndex
            state.Itinerary[itineraryIndex].activities.splice(activityIndex, 1)
        },
        addEditedCategoryItem: (state, action) => {
            const { category } = action.payload
            const { index } = action.payload
            const { formData } = action.payload

            state[category].splice(index, 1, formData)

        },
        removeCategoryItem: (state, action) => {
            const { category } = action.payload
            const { index: itemIndex } = action.payload

            const newCategoryItem = state[category].filter((item, index) => index !== itemIndex)
            state[category] = newCategoryItem
        },
        deleteTripFromUI: (state, action) => {
            const { tripIndex } = action.payload
            const { profileSection } = action.payload

            const trips = state[profileSection].filter((item, index) => index !== tripIndex )
            state[profileSection] = trips
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(saveTrip.pending, (state) => {
                state.isLoading = true
            })
            .addCase(saveTrip.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(saveTrip.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTrips.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTrips.fulfilled, (state, action) => {
                state.isLoading = false
                state.Upcoming = action.payload.upcoming
                state.Ongoing = action.payload.ongoing
                state.Past = action.payload.past
                state.pagination = action.payload.pagination
            })
            .addCase(getTrips.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTrip.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTrip.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTrip.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDeleted = true
                state.isError = false
                state.message = action.payload
            })
            .addCase(updateTrip.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTrip.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = 'Trip succesfully updated!'
                
            })
            .addCase(updateTrip.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(getTrip.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTrip.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTrip.fulfilled, (state, action) => {
                state.isLoading = false
                state.isUpdated = true
                state.tripTitle = action.payload.tripTitle
                state.image = action.payload.image
                state.dates = action.payload.dates
                state.Flights = action.payload.Flights
                state.Cars = action.payload.Cars
                state.Lodging = action.payload.Lodging
                state.Notes = action.payload.Notes
                state.Other = action.payload.Other
                state.Itinerary = action.payload.itinerary 
                state.Expenses = action.payload.expenses

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
    addExpenses,
    addEditedExpense,
    removeExpense,
    addEditedActivity,
    removeActivity,
    removeItinerary,
    addEditedCategoryItem,
    removeCategoryItem,
    deleteTripFromUI
} = tripSlice.actions
export default tripSlice.reducer