import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   errorMessage: ''
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        invalidInputError: (state, action) => {
            const inputValue = action.payload
            if(inputValue === '') state.errorMessage = 'Input is not valid'
            else state.errorMessage = '' 
        }
    }
})

export const { invalidInputError } = errorSlice.actions
export default errorSlice.reducer