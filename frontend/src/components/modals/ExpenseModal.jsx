import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addExpenses, addEditedExpense } from '../../features/trip/tripSlice'
import { closeExpenseModal, resetEdits } from '../../features/modals/modalSlice'

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
    }

    const addExpense = () => {
        if( 
            expenseDate === '' ||
            expensePlace === '' ||
            expenseAmount === ''
        ) {
            dispatch(closeExpenseModal())
            return
        }

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
                    <div className='trip-form-control'>
                        <input 
                            type='date' 
                            name='expenseDate' 
                            id='expenseDate' 
                            value={expenseDate}
                            onChange={handleForm}
                        />
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