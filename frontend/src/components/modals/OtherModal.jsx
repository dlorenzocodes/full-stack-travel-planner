import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { XIcon } from '@heroicons/react/outline'
import { closeOtherModal } from '../../features/modals/modalSlice'
import { addOtherReservation } from '../../features/trip/tripSlice'

function OtherModal() {

  const dispatch = useDispatch()

  const [ formData, setFormData ] = useState({
    reservationName: '',
    otherDate: '',
    otherTime: '',
    otherCheckoutDate: '',
    otherCheckoutTime: '',
    otherNotes: ''
  })
  const { 
    reservationName,
    otherDate,
    otherTime,
    otherCheckoutDate,
    otherCheckoutTime,
    otherNotes
} = formData

const handleForm = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
    }))
}

const closeModal = () => dispatch(closeOtherModal())

const addReservation = () => {
    if(reservationName === ''){
        dispatch(closeOtherModal())
        return
    }
    
    dispatch(addOtherReservation(formData))
    dispatch(closeOtherModal())
}

  return (
      <section className='other-modal-container trip-modal'>
        <form>
            <XIcon onClick={closeModal}/>
            <h3>Add reservation</h3>
            <div className='trip-form-control'>
                <input 
                    type='text' 
                    name='reservationName' 
                    id='reservationName' 
                    value={reservationName}
                    onChange={handleForm}
                    placeholder='Reservation name'
                />
            </div>

            <div className='trip-form-control'>
                <label>Check in:</label>
                <div className='db-input'>
                    <input 
                        type='date' 
                        name='otherDate' 
                        id='otherDate' 
                        value={otherDate}
                        onChange={handleForm}
                    />

                    <input 
                        type='time' 
                        name='otherTime' 
                        id='otherTime' 
                        value={otherTime}
                        onChange={handleForm}
                    />
                </div>
            </div>

            <div className='trip-form-control'>
                <label>Check out:</label>
                <div className='db-input'>
                    <input 
                        type='date' 
                        name='otherCheckoutDate' 
                        id='otherCheckoutDate'
                        value={otherCheckoutDate}
                        onChange={handleForm}
                    />

                    <input 
                        type='time' 
                        name='otherCheckoutTime' 
                        id='otherCheckoutTime'
                        value={otherCheckoutTime}
                        onChange={handleForm} 
                    />
                </div>
            </div>

            <div className='trip-form-control'>
            <textarea 
                name='otherNotes' 
                id='otherNotes' 
                placeholder='Notes'
                value={otherNotes}
                onChange={handleForm}
                />
            </div>

            <button 
                type='button' 
                className='btn'
                onClick={addReservation}
            >
                    Add reservation
            </button>

        </form>
    </section>
  )
}

export default OtherModal