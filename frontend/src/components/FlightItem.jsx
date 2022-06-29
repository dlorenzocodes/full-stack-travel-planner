import { v4 as uuidv4 } from 'uuid';
import useDate from '../hooks/useDate'
import useTime from '../hooks/useTime'
import { useSelector, useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { removeCategoryItem } from '../features/trip/tripSlice'
import { editOverviewCategories, openFlightModal } from '../features/modals/modalSlice'

function FlightItem() {

    const dispatch = useDispatch()
    const { Flights } = useSelector( state => state.trip )
    const { formatDate } = useDate()
    const { formatTime } = useTime()

    const editFlight = (e, index) => {
        const data = {
            category: e.target.id,
            index
        }
        dispatch(editOverviewCategories(data))
        dispatch(openFlightModal())
    }

    const removeFlight = (e, index) => {
        const data = {
            category: e.target.id,
            index
        }
        dispatch(removeCategoryItem(data))
    }

    return (
        <section className='flight-container'>
            {Flights.map( (flight, index) => (
                <div className='flight-info' key={uuidv4()}>
                    <h2>{flight.departure} to {flight.arrival}</h2>
                    <p>{flight.airline} - {flight.flightNumber}</p>
                    <div>
                        <div className='departure-info'>
                            <h3 className='section-heading'>Departue</h3>
                            <p>{formatDate(flight.departureDate)} - {formatTime(flight.departureTime)}</p>
                        </div>

                        <div className='arrival-info'>
                            <h3 className='section-heading'>Arrive</h3>
                            <p>{formatDate(flight.arrivalDate)} - {formatTime(flight.arrivalTime)}</p>
                        </div>
                    </div>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{flight.flightNotes}</p>

                    <div className='operation-icons'>
                        <button
                            type='button'
                            id='Flights'
                            onClick={(e) => editFlight(e, index)}
                        >
                            <PencilAltIcon fill='#2F2E41' />
                        </button>

                        <button
                            type='button'
                            id='Flights' 
                            onClick={(e) => removeFlight(e, index)}
                        >
                            <TrashIcon fill='#2F2E41'/>
                        </button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default FlightItem