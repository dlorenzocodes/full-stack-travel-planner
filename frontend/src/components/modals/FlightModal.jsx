import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { 
    closeFlightModal, 
    resetEdits 
} from '../../features/modals/modalSlice'
import { 
    addFlightReservation, 
    addEditedCategoryItem 
} from '../../features/trip/tripSlice'

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
    }

    const addFlight = () => {
        if(departure === '' || arrival === ''){
            toast.error('Please provide departure and arrival details!')
            dispatch(closeFlightModal())
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
                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='departure' 
                        id='departure' 
                        placeholder='From'
                        value={departure}
                        onChange={handleForm}
                    />
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
                </div>

                <div className='trip-form-control'>
                    <label>Departure:</label>
                    <div className='db-input'>
                        <input 
                            type='date' 
                            name='departuredDate' 
                            id='departureDate'
                            value={departureDate}
                            onChange={handleForm}
                        />

                        <input 
                            type='time' 
                            name='departureTime' 
                            id='departureTime'
                            value={departureTime}
                            onChange={handleForm}
                        />
                    </div>
                </div>

                <div className='trip-form-control'>
                    <label>Arrival:</label>
                    <div className='db-input'>
                        <input 
                            type='date' 
                            name='arrivalDate' 
                            id='arrivalDate'
                            value={arrivalDate}
                            onChange={handleForm}
                        />

                        <input 
                            type='time' 
                            name='arrivalTime' 
                            id='arrivalTime'
                            value={arrivalTime}
                            onChange={handleForm}
                        />
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