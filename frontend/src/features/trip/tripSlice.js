import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
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

            if(category === 'Flights'){
                state.Flights.splice(index, 1, formData)
            } else if(category === 'Cars'){
                state.Cars.splice(index, 1, formData)
            }else if(category === 'Lodging'){
                state.Lodging.splice(index, 1, formData)
            }else if(category === 'Other'){
                state.Other.splice(index, 1, formData)
            }else{
                state.Notes.splice(index, 1, formData)
            }

        },
        removeCategoryItem: (state, action) => {
            const { category } = action.payload
            const { index: itemIndex } = action.payload

            if( category === 'Flights'){
                const newFlights = state.Flights.filter((item, index) => index !== itemIndex)
                state.Flights = newFlights
            } else if( category === 'Cars'){
                const newCars = state.Cars.filter((item, index) => index !== itemIndex)
                state.Cars = newCars
            } else if( category === 'Lodging'){
                const newLodging = state.Lodging.filter((item, index) => index !== itemIndex)
                state.Lodging = newLodging
            }else if( category === 'Other'){
                const newOther = state.Other.filter((item, index) => index !== itemIndex)
                state.Other = newOther
            }else{
                const newNotes = state.Notes.filter((item, index) => index !== itemIndex)
                state.Notes = newNotes
            }
        },
        deleteTripFromUI: (state, action) => {
            const { tripIndex } = action.payload
            const { profileSection } = action.payload

            if(profileSection === 'Past'){
                const trips = state.Past.filter((item, index) => index !== tripIndex )
                state.Past = trips
            } else if(profileSection === 'Ongoing'){
                const trips = state.Ongoing.filter((item, index) => index !== tripIndex )
                state.Ongoing = trips
            } else{
                const trips = state.Upcoming.filter((item, index) => index !== tripIndex )
                state.Upcoming = trips
            }
        },
        editTrip: (state, action) => {
            const { tripId } = action.payload
            const { profileSection } = action.payload
            state.isUpdated = true

            const selectedTrip = state[profileSection].find(item => item._id === tripId) 
            state.tripTitle = selectedTrip.tripTitle
            state.image = selectedTrip.image
            state.dates = selectedTrip.dates
            state.Flights = selectedTrip.Flights
            state.Cars = selectedTrip.Cars
            state.Lodging = selectedTrip.Lodging
            state.Notes = selectedTrip.Notes
            state.Other = selectedTrip.Other
            state.Itinerary = selectedTrip.Itinerary
            state.Expenses = selectedTrip.Expenses
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
    deleteTripFromUI,
    editTrip
} = tripSlice.actions
export default tripSlice.reducer