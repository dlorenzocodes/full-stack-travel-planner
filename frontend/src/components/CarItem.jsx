import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function FlightItem() {

    const { Cars } = useSelector( state => state.trip )

    return (
        <section className='cars-container'>
            {Cars.map( item => (
                <div className='car-info' key={uuidv4()}>
                    <h2>{item.rental}</h2>
                    
                    <div className='reservation-info'>
                        <div className='pickup-info'>
                            <h3 className='section-heading'>Pick up:</h3>
                            <p>{item.pickupDate} - {item.pickupTime}</p>
                            <span>{item.pickupAddress}</span>
                        </div>

                        <div className='dropoff-info'>
                            <h3 className='section-heading'>Drop off:</h3>
                            <p>{item.dropoffDate} - {item.dropoffTime}</p>
                            <span>{item.dropoffAddress}</span>
                        </div>
                    </div>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{item.carNotes}</p>

                    <div>
                        <PencilAltIcon  fill='#2F2E41' id='Cars'/>
                        <TrashIcon fill='#2F2E41' id='Cars' />
                    </div>
                </div>
            ))}
        </section>
    )
}

export default FlightItem