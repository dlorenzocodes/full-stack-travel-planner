import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { closeCarModal, resetEdits } from '../../features/modals/modalSlice'
import { addCarReservation, addEditedCategoryItem } from '../../features/trip/tripSlice'

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

    const { Cars } = useSelector( state => state.trip )
    const { isEditCars, index: itemIndex } = useSelector( state => state.modal )

    useEffect(() => {
        if(isEditCars){
            const carItem = Cars.find((item, index) => index === itemIndex)
            setFormData({
                rental: carItem.rental,
                pickupAddress: carItem.pickupAddress,
                dropoffAddress: carItem.dropoffAddress,
                pickupDate: carItem.pickupDate,
                pickupTime: carItem.pickupTime,
                dropoffDate: carItem.dropoffDate,
                dropoffTime: carItem.dropoffTime,
                carNotes: carItem.carNotes
            })
        }

    },[isEditCars, itemIndex, Cars])

    const closeModal = () => dispatch(closeCarModal())

    const addCar = () => { 
        if(rental === ''){
            toast.error('Please fill rental field!')
            return
        }

        const address = isChecked ? pickupAddress : dropoffAddress
        const data = { ...formData, dropoffAddress: address } 

        if(isEditCars){
            const editedData = {
                category: 'Cars',
                index: itemIndex,
                formData: data
            }

            dispatch(addEditedCategoryItem(editedData))
            dispatch(closeCarModal())
            dispatch(resetEdits())
            return
        }
       
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
            <span className='required-field error'>
                Note: rental field is required
            </span>
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