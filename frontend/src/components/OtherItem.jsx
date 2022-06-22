import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function OtherItem() {

    const { Other } = useSelector( state => state.trip )

    return (
        <section className='other-container'>
            {Other.map( item => (
                <div className='other-info' key={uuidv4()}>
                    <h2>{item.reservationName}</h2>
                    <div>
                        <div className='checkin-info'>
                            <h3 className='section-heading'>Check in:</h3>
                            <p>{item.otherDate} - {item.otherTime}</p>
                        </div>

                        <div className='checkout-info'>
                            <h3 className='section-heading'>Check out:</h3>
                            <p>{item.otherCheckoutDate} - {item.otherCheckoutTime}</p>
                        </div>
                    </div>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{item.otherNotes}</p>

                    <div>
                        <PencilAltIcon  fill='#2F2E41' id='Other'/>
                        <TrashIcon fill='#2F2E41' id='Other'/>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default OtherItem