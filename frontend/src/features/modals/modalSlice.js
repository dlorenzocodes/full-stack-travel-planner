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
        resetEdits: (state, action) => {
            if(action.payload === 'expense'){
                state.isEditExpense = false
            }
            state.index = ''
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
    resetEdits
} = modalSlice.actions
export default modalSlice.reducer