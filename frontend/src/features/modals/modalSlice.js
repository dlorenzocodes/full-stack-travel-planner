import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    addTripModal: false,
    addNewTripForm: false,
    searchCityModal: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
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
        }
    }
})

export const { 
    openAddTripModal, 
    closeAddTripModal,
    openNewTripForm,
    closeNewTripForm,
    openSearchCityModal,
    closedSearchCityModel
} = modalSlice.actions
export default modalSlice.reducer