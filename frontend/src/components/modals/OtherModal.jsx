import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useDecode } from '../../hooks/useDecode'
import { useDispatch, useSelector } from 'react-redux'
import { useTripValidation } from '../../hooks/useTripValidation'
import { closeOtherModal, resetEdits } from '../../features/modals/modalSlice'
import { addOtherReservation, addEditedCategoryItem } from '../../features/trip/tripSlice'

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

const { decodeString } = useDecode()
const { Other }  = useSelector( state => state.trip )
const { isEditOthers, index: otherIndex} = useSelector( state => state.modal )
const { validateTrip, errors } = useTripValidation(formData)

useEffect(() => {
    if(isEditOthers){
        const otherItem = Other.find((item, index) => index === otherIndex)
        setFormData({
            reservationName: otherItem.reservationName,
            otherDate: otherItem.otherDate,
            otherTime: otherItem.otherTime,
            otherCheckoutDate: otherItem.otherCheckoutDate,
            otherCheckoutTime: otherItem.otherCheckoutTime,
            otherNotes: otherItem.otherNotes
        })
    }

}, [isEditOthers, otherIndex, Other])

const handleForm = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
    }))

    validateTrip(e.target)
}

const closeModal = () => dispatch(closeOtherModal())

const addReservation = () => {
    if(reservationName === ''){
        toast.error('Please fill reservation name field!')
        return
    }

    if(
        errors.reservationName !== '' ||
        errors.otherDate !== '' ||
        errors.otherTime !== '' ||
        errors.otherCheckoutDate !== '' ||
        errors.otherCheckoutTime !== ''
    ){
        toast.error('Please fix errors before submitting')
        return
    }

    formData.otherNotes = decodeString(otherNotes)

    if(isEditOthers){
        const data = {
            category: 'Other',
            index: otherIndex,
            formData
        }

        dispatch(addEditedCategoryItem(data))
        dispatch(closeOtherModal())
        dispatch(resetEdits())
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
            <span className='required-field error'>
                Note: reservation name field is required
            </span>
            <div className='trip-form-control'>
                <input 
                    type='text' 
                    name='reservationName' 
                    id='reservationName' 
                    value={reservationName}
                    onChange={handleForm}
                    placeholder='Reservation name'
                />
                {errors.reservationName !== '' && <span>{errors.reservationName}</span>}
            </div>

            <div className='trip-form-control'>
                <label>Check in:</label>
                <div className='db-input'>

                    <div>
                        <input 
                            type='date' 
                            name='otherDate' 
                            id='otherDate' 
                            value={otherDate}
                            onChange={handleForm}
                        />
                         {errors.otherDate !== '' && <span>{errors.otherDate}</span>}
                    </div>

                    <div>
                        <input 
                            type='time' 
                            name='otherTime' 
                            id='otherTime' 
                            value={otherTime}
                            onChange={handleForm}
                        />
                         {errors.otherTime !== '' && <span>{errors.otherTime}</span>}
                    </div>
                </div>
            </div>

            <div className='trip-form-control'>
                <label>Check out:</label>
                <div className='db-input'>

                    <div>
                        <input 
                            type='date' 
                            name='otherCheckoutDate' 
                            id='otherCheckoutDate'
                            value={otherCheckoutDate}
                            onChange={handleForm}
                        />
                         {errors.otherCheckoutDate !== '' && <span>{errors.otherCheckoutDate}</span>}
                    </div>

                    <div>
                        <input 
                            type='time' 
                            name='otherCheckoutTime' 
                            id='otherCheckoutTime'
                            value={otherCheckoutTime}
                            onChange={handleForm} 
                        />
                         {errors.otherCheckoutTime !== '' && <span>{errors.otherCheckoutTime}</span>}
                    </div>
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