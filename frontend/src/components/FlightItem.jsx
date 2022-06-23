import { v4 as uuidv4 } from 'uuid';
import useDate from '../hooks/useDate'
import useTime from '../hooks/useTime'
import { useSelector } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function FlightItem() {

    const { Flights } = useSelector( state => state.trip )
    const { formatDate } = useDate()
    const { formatTime } = useTime()

    return (
        <section className='flight-container'>
            {Flights.map( flight => (
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

                    <div>
                        <PencilAltIcon  fill='#2F2E41' id='Flights'/>
                        <TrashIcon fill='#2F2E41' id='Flights' />
                    </div>
                </div>
            ))}
        </section>
    )
}

export default FlightItem