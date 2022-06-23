import { v4 as uuidv4 } from 'uuid';
import useDate from '../hooks/useDate'
import { useDispatch, useSelector } from 'react-redux'
import { removeExpense } from '../features/trip/tripSlice'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { openExpenseModal, editExpense } from '../features/modals/modalSlice'

function Expenses() {

  const dispatch = useDispatch()
  const { formatDate } = useDate()
  const { expenseModal } = useSelector( state => state.modal )
  const { Expenses } = useSelector( state => state.trip )

  const showExpenseModal = () => dispatch(openExpenseModal())

  const handleExpenseEdit = (index) => {
    dispatch(editExpense(index))
    dispatch(openExpenseModal())
  }

  const handleRemoveExpense = (index) => {
    dispatch(removeExpense(index))
  }

  return (
    <section className='expenses-container'>
      {
          Expenses.length === 0 ? '' :
          Expenses.map((item, index) => (
            <div 
              className='expense-info' 
              key={uuidv4()} 
              id={index}
            >
              <h2>{formatDate(item.expenseDate)} - {item.expensePlace}</h2>
              <h2 className='section-heading'>Amount: ${item.expenseAmount}</h2>
              <h3 className='section-heading'>Notes</h3>
              <p id='textarea-notes'>{item.expenseNotes}</p>

              <div>
                  <PencilAltIcon  
                    fill='#2F2E41' 
                    id='Flights'
                    onClick={() => handleExpenseEdit(index)}
                  />
                  <TrashIcon 
                    fill='#2F2E41' 
                    id='Flights' 
                    onClick={() => handleRemoveExpense(index)}
                  />
              </div>
            </div>
          ))
      }
       <button 
          className={ expenseModal ? 'btn hidden' : 'btn'}
          type='button'
          onClick={showExpenseModal}
          >
            Add expenses
        </button> 
    </section>
  )
}

export default Expenses