import { useDispatch } from 'react-redux'
import { closeFlightModal } from '../../features/modals/modalSlice'

function FlightModal() {

    const dispatch = useDispatch()

    const addFlight = () => dispatch(closeFlightModal())
    
    return (
        <section className='flight-modal-container trip-modal'>
            <form>
                <h3>Add a flight</h3>
                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='departure' 
                        id='departure' 
                        placeholder='From'
                    />
                </div>

                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='arrival' 
                        id='arrival' 
                        placeholder='To'
                    />
                </div>

                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='airline' 
                        id='airline' 
                        placeholder='Airline'
                    />
                </div>

                <div className='trip-form-control'>
                    <input 
                        type='text' 
                        name='flight-number' 
                        id='flight-number' 
                        placeholder='Flight number'
                    />
                </div>

                <div className='trip-form-control'>
                    <label>Departure:</label>
                    <div className='db-input'>
                        <input 
                            type='date' 
                            name='departure-date' 
                            id='departure-date' 
                        />

                        <input 
                            type='time' 
                            name='departure-time' 
                            id='departure-time' 
                        />
                    </div>
                </div>

                <div className='trip-form-control'>
                    <label>Arrival:</label>
                    <div className='db-input'>
                        <input 
                            type='date' 
                            name='arrival-date' 
                            id='arrival-date' 
                        />

                        <input 
                            type='time' 
                            name='arrival-time' 
                            id='arrival-time' 
                        />
                    </div>
                </div>

                <div className='trip-form-control'>
                <textarea 
                    name='flight-notes' 
                    id='flight-notes' 
                    placeholder='Notes'
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