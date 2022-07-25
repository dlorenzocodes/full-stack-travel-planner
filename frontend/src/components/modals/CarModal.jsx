import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { useTripValidation } from '../../hooks/useTripValidation'
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
    const { validateTrip, errors } = useTripValidation(formData)

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

        if(
            errors.rental !== '' ||
            errors.pickupAddress !== '' ||
            errors.dropoffAddress !== '' ||
            errors.pickupDate !== '' ||
            errors.pickupTime !== '' ||
            errors.dropoffDate !== '' ||
            errors.dropoffTime !== ''
        ){
            toast.error('Please fix errors before submitting!')
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

        validateTrip(e.target)
    }
    
    const onChange = (e) => {
        if(e.target.checked) setIsChecked(true)
        else setIsChecked(false)
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
                {errors.rental !== '' && <span>{errors.rental}</span>}
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
                {errors.pickupAddress !== '' && <span>{errors.pickupAddress}</span>}
            </div>

            <div className='address-question'>
                <input 
                    type='checkbox' 
                    id='same-address' 
                    onChange={onChange}
                />
                <label htmlFor='same-address'>Is drop off the same address?</label>
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
                {errors.dropoffAddress !== '' && <span>{errors.dropoffAddress}</span>}
            </div>

            <div className='trip-form-control'>
                <label>Pick up:</label>
                <div className='db-input'>
                    <div>
                        <input 
                            type='date' 
                            name='pickupDate' 
                            id='pickupDate'
                            value={pickupDate}
                            onChange={handleForm} 
                        />
                        {errors.pickupDate !== '' && <span>{errors.pickupDate}</span>}
                    </div>

                    <div>
                        <input 
                            type='time' 
                            name='pickupTime' 
                            id='pickupTime'
                            value={pickupTime}
                            onChange={handleForm} 
                        />
                        {errors.pickupTime !== '' && <span>{errors.pickupTime}</span>}
                    </div>
                </div>
            </div>

            <div className='trip-form-control'>
                <label>Drop off:</label>
                <div className='db-input'>

                    <div>
                        <input 
                            type='date' 
                            name='dropoffDate' 
                            id='dropoffDate'
                            value={dropoffDate}
                            onChange={handleForm} 
                        />
                        {errors.dropoffDate !== '' && <span>{errors.dropoffDate}</span>}
                    </div>

                    <div>
                        <input 
                            type='time' 
                            name='dropoffTime' 
                            id='dropoffTime'
                            value={dropoffTime}
                            onChange={handleForm} 
                        />
                        {errors.dropoffTime !== '' && <span>{errors.dropoffTime}</span>}
                    </div>
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