import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { useTripValidation } from '../../hooks/useTripValidation'
import { closeFlightModal, resetEdits } from '../../features/modals/modalSlice'
import { addFlightReservation, addEditedCategoryItem } from '../../features/trip/tripSlice'

function FlightModal() {
    
    const dispatch = useDispatch()
    const [ formData, setFormData ] = useState({
        departure: '',
        arrival: '',
        airline: '',
        flightNumber: '',
        departureDate: '',
        departureTime: '',
        arrivalDate: '',
        arrivalTime: '',
        flightNotes: ''
    })

    const { 
        departure,
        arrival, 
        airline, 
        flightNumber,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        flightNotes
    } = formData

    const { Flights } = useSelector( state => state.trip )
    const { isEditFlights, index: flightIndex } = useSelector( state => state.modal )
    const { validateTrip, errors } = useTripValidation(formData)


    useEffect(() => {
        if(isEditFlights){
            const flightItem = Flights.find((item, index) => index === flightIndex)
            setFormData({
                departure: flightItem.departure,
                arrival: flightItem.arrival,
                airline: flightItem.airline,
                flightNumber: flightItem.flightNumber,
                departureDate: flightItem.departureDate,
                departureTime: flightItem.departureTime,
                arrivalDate: flightItem.arrivalDate,
                arrivalTime: flightItem.arrivalTime,
                flightNotes: flightItem.flightNotes
            })
        }
    },[isEditFlights, flightIndex, Flights])


    const closeModal = () => dispatch(closeFlightModal())


    const handleForm = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))

        validateTrip(e.target)
    }



    const addFlight = () => {
        if(departure === '' || arrival === ''){
            toast.error('Please provide departure and arrival details!')
            return
        }

        if(
            errors.departure !== '' ||
            errors.arrival !== '' ||
            errors.airline !== '' ||
            errors.flightNumber !== '' ||
            errors.departureDate !== '' ||
            errors.departureTime !== '' ||
            errors.arrivalTime !== '' ||
            errors.arrivalDate !== ''
        ){
           toast.error('Please fix errors befoe submitting')
           return
        }

        if(isEditFlights){
            const data = {
                category: 'Flights',
                index: flightIndex,
                formData
            }
            dispatch(addEditedCategoryItem(data))
            dispatch(closeFlightModal())
            dispatch(resetEdits())
            return
        }
        
        dispatch(addFlightReservation(formData))
        dispatch(closeFlightModal())
    }
    
    return (
        <section className='flight-modal-container trip-modal'>
            <form>
                <XIcon onClick={closeModal}/>
                <h3>Add a flight</h3>
                <span className='required-field error'>
                    Note: arrival and departure fields are required
                </span>
                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='departure' 
                        id='departure' 
                        placeholder='From'
                        value={departure}
                        onChange={handleForm}
                    />
                    {errors.departure !== '' && <span>{errors.departure}</span>}
                </div>

                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='arrival' 
                        id='arrival' 
                        placeholder='To'
                        value={arrival}
                        onChange={handleForm}
                    />
                    {errors.arrival !== '' && <span>{errors.arrival}</span>}
                </div>

                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='airline' 
                        id='airline' 
                        placeholder='Airline'
                        value={airline}
                        onChange={handleForm}
                    />
                    {errors.airline !== '' && <span>{errors.airline}</span>}
                </div>

                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='flightNumber' 
                        id='flightNumber' 
                        placeholder='Flight number'
                        value={flightNumber}
                        onChange={handleForm}
                    />
                    {errors.flightNumber !== '' && <span>{errors.flightNumber}</span>}
                </div>

                <div className='trip-form-control'>
                    <label>Departure:</label>
                    <div className='db-input'>
                        <div>
                            <input 
                                type='date' 
                                name='departureDate' 
                                id='departureDate'
                                value={departureDate}
                                onChange={handleForm}
                            />
                            {errors.departureDate !== '' && <span>{errors.departureDate}</span>}
                        </div>

                        <div>
                            <input 
                                type='time' 
                                name='departureTime' 
                                id='departureTime'
                                value={departureTime}
                                onChange={handleForm}
                            />
                            {errors.departureTime !== '' && <span>{errors.departureTime}</span>}
                        </div>

                    </div>
                </div>

                <div className='trip-form-control'>
                    <label>Arrival:</label>
                    <div className='db-input'>
                        <div>
                            <input 
                                type='date' 
                                name='arrivalDate' 
                                id='arrivalDate'
                                value={arrivalDate}
                                onChange={handleForm}
                            />
                            {errors.arrivalDate !== '' && <span>{errors.arrivalDate}</span>}
                        </div>

                        <div>
                            <input 
                                type='time' 
                                name='arrivalTime' 
                                id='arrivalTime'
                                value={arrivalTime}
                                onChange={handleForm}
                            />
                            {errors.arrivalTime !== '' && <span>{errors.arrivalTime}</span>}
                        </div>

                    </div>
                </div>

                <div className='trip-form-control'>
                <textarea 
                    name='flightNotes' 
                    id='flightNotes' 
                    placeholder='Notes'
                    value={flightNotes}
                    onChange={handleForm}
                />
                </div>

                <button 
                    type='button' 
                    className='btn'
                    onClick={addFlight}
                >
                        Add Flight
                </button>

            </form>
        </section>
    )
}

export default FlightModal