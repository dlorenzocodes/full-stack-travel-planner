import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { XIcon } from '@heroicons/react/outline'
import { closeFlightModal } from '../../features/modals/modalSlice'
import { addFlightReservation } from '../../features/trip/tripSlice'

function FlightModal() {
    
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

    const dispatch = useDispatch()

    const closeModal = () => dispatch(closeFlightModal())
   

    const handleForm = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const addFlight = () => {
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