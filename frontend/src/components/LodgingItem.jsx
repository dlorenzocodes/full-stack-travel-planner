import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function LodgingItem() {

    const { Lodging } = useSelector( state => state.trip )

    return (
        <section className='lodging-container'>
            {Lodging.map( item => (
                <div className='lodging-info' key={uuidv4()}>
                    <h2>{item.hotel}</h2>
                    <p>{item.hotelAddress}</p>
                    <div>
                        <div className='checkin-info'>
                            <h3 className='section-heading'>Check in:</h3>
                            <p>{item.checkinDate} - {item.checkinTime}</p>
                        </div>

                        <div className='checkout-info'>
                            <h3 className='section-heading'>Check out:</h3>
                            <p>{item.checkoutDate} - {item.checkoutTime}</p>
                        </div>
                    </div>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{item.hotelNotes}</p>

                    <div>
                        <PencilAltIcon  fill='#2F2E41' id='Lodging'/>
                        <TrashIcon fill='#2F2E41' id='Lodging'/>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default LodgingItem