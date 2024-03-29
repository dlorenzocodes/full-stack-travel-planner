import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { useTripValidation } from '../../hooks/useTripValidation'
import { addExpenses, addEditedExpense } from '../../features/trip/tripSlice'
import { closeExpenseModal, resetEdits } from '../../features/modals/modalSlice'
import { useDecode } from '../../hooks/useDecode'

function ExpenseModal() {

    const dispatch = useDispatch()
    const [ formData, setFormData ] = useState({
        expenseDate: '',
        expensePlace: '',
        expenseAmount: '',
        expenseNotes: ''
    })

    const { expenseDate, expensePlace, expenseAmount, expenseNotes } = formData

    const { Expenses } = useSelector( state => state.trip )
    const { isEditExpense, index: expenseIndex } = useSelector( state => state.modal )
    const{ validateTrip, errors } = useTripValidation(formData)
    const { decodeString } = useDecode()

    useEffect(() => {
        if(isEditExpense){
            const expenseItem = Expenses.find((item, index) => expenseIndex === index)
            setFormData({
                expenseDate: expenseItem.expenseDate,
                expensePlace: expenseItem.expensePlace,
                expenseAmount: '',
                expenseNotes: expenseItem.expenseNotes
            })
        }
    },[isEditExpense, expenseIndex, Expenses])


    const closeModal = () => dispatch(closeExpenseModal())

    const handleForm = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))

        validateTrip(e.target)
    }


    const addExpense = () => {
        if( 
            expenseDate === '' ||
            expensePlace === '' ||
            expenseAmount === ''
        ) {
            toast.error('Please make sure date, place and amount fields have been filled!')
            return
        } 
        
        if(expenseAmount < 0){
            toast.error('Amount entered is not a valid entry!')
            return
        }

        if( 
            errors.expensePlace !== '' || 
            errors.expenseDate !== ''
        ) {
            toast.error('Please fix errors before sumbitting')
            return
        }

        formData.expenseNotes = decodeString(expenseNotes)

        if(isEditExpense){
            const data = {
                expenseIndex,
                expense: {...formData, expenseAmount }
            }

            dispatch(addEditedExpense(data))
            dispatch(closeExpenseModal())
            dispatch(resetEdits())
            return
        }

        dispatch(addExpenses(formData))
        dispatch(closeExpenseModal())
    }

    return (
        <section className='expense-modal-container trip-modal'>
                <form>
                    <XIcon onClick={closeModal}/>
                    <h3>Add an expense</h3>
                    <span className='required-field error'>
                        Note: date, place, and amount fields are required
                    </span>
                    <div className='trip-form-control'>
                        <input 
                            type='date' 
                            name='expenseDate' 
                            id='expenseDate' 
                            value={expenseDate}
                            onChange={handleForm}
                        />
                        {errors.expenseDate !== '' && <span>{errors.expenseDate}</span>}
                    </div>

                    <div className='trip-form-control'>
                        <input 
                            type='expensePlace' 
                            name='expensePlace' 
                            id='expensePlace' 
                            placeholder='Place'
                            value={expensePlace}
                            onChange={handleForm}
                        />
                        {errors.expensePlace !== '' && <span>{errors.expensePlace}</span>}
                    </div>

                    <div className='trip-form-control'>
                        <input 
                            type='number' 
                            name='expenseAmount' 
                            id='expenseAmount' 
                            step='0.01'
                            placeholder='1.0'
                            value={expenseAmount}
                            onChange={handleForm}
                        />
                    </div>

                    <div className='trip-form-control'>
                    <textarea 
                        name='expenseNotes' 
                        id='expenseNotes' 
                        placeholder='Notes'
                        value={expenseNotes}
                        onChange={handleForm}
                    />
                    </div>

                    <button 
                        type='button' 
                        className='btn'
                        onClick={addExpense}
                    >
                            Add expense
                    </button>

                </form>
            </section>
    )
}

export default ExpenseModal