import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { XIcon } from '@heroicons/react/outline'
import { closeCarModal } from '../../features/modals/modalSlice'
import { addCarReservation } from '../../features/trip/tripSlice'

function CarModal() {

    const dispatch = useDispatch()
    const [ isChecked, setIsChecked ] = useState(false)
    const [ formData, setFormData ] = useState({
        rental: '',
        pickupAddress: '',
        dropoffAddress: '',
        pickupDate: '',
        pickupTime: '',
        dropoffDate: '',
        dropoffTime: '',
        carNotes: ''
    })
    const {
        rental,
        pickupAddress,
        dropoffAddress,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
        carNotes
    } = formData

    const closeModal = () => dispatch(closeCarModal())
    const addCar = () => { 
        const address = isChecked ? pickupAddress : dropoffAddress
        const data = { ...formData, dropoffAddress: address } 
        dispatch(addCarReservation(data))
        dispatch(closeCarModal())
    }

    const handleForm = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    
    const onChange = (e) => {
        if(e.target.checked) {
            setIsChecked((prevState) => !prevState)
        }
    }

    return (
        <section className='car-modal-container trip-modal'>
        <form>
            <XIcon onClick={closeModal}/>
            <h3>Add rental car</h3>
            <div className='trip-form-control'>
                <input 
                    type='text' 
                    name='rental' 
                    id='rental' 
                    value={rental}
                    onChange={handleForm}
                    placeholder='Rental car name'
                />
            </div>

            <div className='trip-form-control'>
                <input 
                    type='text' 
                    name='pickupAddress' 
                    id='pickupAddress' 
                    value={pickupAddress}
                    onChange={handleForm}
                    placeholder='Pick up address'
                />
            </div>

            <div className='address-question'>
                <input 
                    type='checkbox' 
                    id='same-address' 
                    onChange={onChange}
                />
                <label>Is drop off the same address?</label>
            </div>

            <div className='trip-form-control'>
                <input 
                    type='text' 
                    className={ isChecked ? 'isHidden' : ''}
                    name='dropoffAddress' 
                    id='dropoffAddress' 
                    value={dropoffAddress}
                    onChange={handleForm}
                    placeholder='Drop off address'
                />
            </div>

            <div className='trip-form-control'>
                <label>Pick up:</label>
                <div className='db-input'>
                    <input 
                        type='date' 
                        name='pickupDate' 
                        id='pickupDate'
                        value={pickupDate}
                        onChange={handleForm} 
                    />

                    <input 
                        type='time' 
                        name='pickupTime' 
                        id='pickupTime'
                        value={pickupTime}
                        onChange={handleForm} 
                    />
                </div>
            </div>

            <div className='trip-form-control'>
                <label>Drop off:</label>
                <div className='db-input'>
                    <input 
                        type='date' 
                        name='dropoffDate' 
                        id='dropoffDate'
                        value={dropoffDate}
                        onChange={handleForm} 
                    />

                    <input 
                        type='time' 
                        name='dropoffTime' 
                        id='dropoffTime'
                        value={dropoffTime}
                        onChange={handleForm} 
                    />
                </div>
            </div>

            <div className='trip-form-control'>
            <textarea 
                name='carNotes' 
                id='carNotes' 
                value={carNotes}
                onChange={handleForm}
                placeholder='Notes'
                />
            </div>

            <button 
                type='button' 
                className='btn'
                onClick={addCar}
            >
                    Add rental car
            </button>

        </form>
        </section>
    )
}

export default CarModal