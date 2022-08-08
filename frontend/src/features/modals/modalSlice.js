import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    addTripModal: false,
    addNewTripForm: false,
    searchCityModal: false,
    flightModal: false,
    carModal: false,
    hotelModal: false,
    otherModal: false,
    notesModal: false,
    expenseModal: false,
    isEditExpense: false,
    isEditFlights: false,
    isEditCars: false,
    isEditLodging: false,
    isEditNotes: false,
    isEditOthers: false,
    index: ''
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        resetModals: (state) => initialState,
        openAddTripModal: (state) => {
            state.addTripModal = true
        },
        closeAddTripModal: (state) => {
            state.addTripModal = false
        },
        openNewTripForm: (state) => {
            state.addNewTripForm = true
        },
        closeNewTripForm: (state) => {
            state.addNewTripForm = false
        },
        openSearchCityModal: (state) => {
            state.searchCityModal = true
        },
        closedSearchCityModel: (state) => {
            state.searchCityModal = false
        },
        openFlightModal: (state) => {
            state.flightModal = true
        },
        closeFlightModal: (state) => {
            state.flightModal = false
        },
        openHotelModal: (state) => {
            state.hotelModal = true
        },
        closeHotelModal: (state) => {
            state.hotelModal = false
        },
        openCarModal: (state) => {
            state.carModal = true
        },
        closeCarModal: (state) => {
            state.carModal = false
        },
        openOtherModal: (state) => {
            state.otherModal = true
        },
        closeOtherModal: (state) => {
            state.otherModal = false
        },
        openNoteModal: (state) => {
            state.notesModal = true
        },
        closeNoteModal: (state) => {
            state.notesModal = false
        },
        openExpenseModal: (state) => {
            state.expenseModal = true
        },
        closeExpenseModal: (state) => {
            state.expenseModal = false
        },
        editExpense: (state, action) => {
            state.isEditExpense = true
            state.index = action.payload
        },
        resetEdits: (state) => {
            state.isEditExpense = false
            state.isEditFlights = false
            state.isEditCars = false
            state.isEditLodging = false
            state.isEditNotes = false
            state.isEditOthers = false
            state.index = ''
        },
        editOverviewCategories: (state, action) => {
            const { category } = action.payload
            if(category === 'Flights') state.isEditFlights = true
            else if(category === 'Cars') state.isEditCars = true
            else if(category === 'Lodging') state.isEditLodging = true
            else if(category === 'Other') state.isEditOthers = true
            else state.isEditNotes = true

            state.index = action.payload.index
        }
    }
})

export const { 
    openAddTripModal, 
    closeAddTripModal,
    openNewTripForm,
    closeNewTripForm,
    openSearchCityModal,
    closedSearchCityModel,
    openFlightModal,
    closeFlightModal,
    openHotelModal,
    closeHotelModal,
    openCarModal,
    closeCarModal,
    openOtherModal,
    closeOtherModal,
    openNoteModal,
    closeNoteModal,
    openExpenseModal,
    closeExpenseModal,
    resetModals,
    editExpense,
    resetEdits,
    editOverviewCategories
} = modalSlice.actions
export default modalSlice.reducer