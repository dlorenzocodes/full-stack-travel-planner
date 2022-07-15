import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { closeHotelModal, resetEdits } from '../../features/modals/modalSlice'
import { addHotelReservation, addEditedCategoryItem } from '../../features/trip/tripSlice'


function HotelModal() {

    const dispatch =  useDispatch()

    const [ formData, setFormData ] = useState({
        hotel: '',
        hotelAddress: '',
        checkinDate: '',
        checkinTime: '',
        checkoutDate: '',
        checkoutTime: '',
        hotelNotes: ''
    })
    const { 
        hotel,
        hotelAddress,
        checkinDate,
        checkinTime,
        checkoutDate,
        checkoutTime,
        hotelNotes
    } = formData

    const { Lodging } = useSelector( state => state.trip )
    const { isEditLodging, index: lodgingIndex} = useSelector( state => state.modal )

    useEffect(() => {
        if(isEditLodging) {
            const lodgingItem = Lodging.find((item, index) => index === lodgingIndex)
            setFormData({
                hotel: lodgingItem.hotel,
                hotelAddress: lodgingItem.hotelAddress,
                checkinDate: lodgingItem.checkinDate,
                checkinTime: lodgingItem.checkinTime,
                checkoutDate: lodgingItem.checkoutDate,
                checkoutTime: lodgingItem.checkoutTime,
                hotelNotes: lodgingItem.hotelNotes
            })
        }
    }, [isEditLodging, lodgingIndex, Lodging])

    const handleForm = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const closeModal = () => dispatch(closeHotelModal())

    const addHotel = () => {
        if(hotel === ''){
            toast.error('Please fill hotel or lodging field')
            return
        }

        if(isEditLodging){
            const data = {
                category: 'Lodging',
                index: lodgingIndex,
                formData
            }

            dispatch(addEditedCategoryItem(data))
            dispatch(closeHotelModal())
            dispatch(resetEdits())
            return
        }
        
        dispatch(addHotelReservation(formData))
        dispatch(closeHotelModal())
    }
    
    return (
        <section className='hotel-modal-container trip-modal'>
                <form>
                    <XIcon onClick={closeModal}/>
                    <h3>Add a hotel or lodging</h3>
                    <span className='required-field error'>
                        Notes: hotel or lodging field is required
                    </span>
                    <div className='trip-form-control'>
                        <input 
                            type='text' 
                            name='hotel' 
                            id='hotel' 
                            value={hotel}
                            onChange={handleForm}
                            placeholder='Hotel or lodging name'
                        />
                    </div>

                    <div className='trip-form-control'>
                        <input 
                            type='text' 
                            name='hotelAddress' 
                            id='hotelAddress' 
                            value={hotelAddress}
                            onChange={handleForm}
                            placeholder='Address'
                        />
                    </div>

                    <div className='trip-form-control'>
                        <label>Check in:</label>
                        <div className='db-input'>
                            <input 
                                type='date' 
                                name='checkinDate' 
                                id='checkinDate' 
                                value={checkinDate}
                                onChange={handleForm}
                            />

                            <input 
                                type='time' 
                                name='checkinTime' 
                                id='checkinTime' 
                                value={checkinTime}
                                onChange={handleForm}
                            />
                        </div>
                    </div>

                    <div className='trip-form-control'>
                        <label>Check out:</label>
                        <div className='db-input'>
                            <input 
                                type='date' 
                                name='checkoutDate' 
                                id='checkoutDate' 
                                value={checkoutDate}
                                onChange={handleForm}
                            />

                            <input 
                                type='time' 
                                name='checkoutTime' 
                                id='checkoutTime' 
                                value={checkoutTime}
                                onChange={handleForm}
                            />
                        </div>
                    </div>

                    <div className='trip-form-control'>
                    <textarea 
                        name='hotelNotes' 
                        id='hotelNotes' 
                        placeholder='Notes'
                        value={hotelNotes}
                        onChange={handleForm}
                    />
                    </div>

                    <button 
                        type='button' 
                        className='btn'
                        onClick={addHotel}
                    >
                            Add hotel or lodging
                    </button>

                </form>
            </section>
    )
}

export default HotelModal