import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    addTripModal: false
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
        }
    }
})

export const { openAddTripModal, closeAddTripModal } = modalSlice.actions
export default modalSlice.reducer