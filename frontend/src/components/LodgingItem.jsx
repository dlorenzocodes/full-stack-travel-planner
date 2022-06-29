import { v4 as uuidv4 } from 'uuid';
import useDate from '../hooks/useDate'
import useTime from '../hooks/useTime'
import { useSelector, useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { removeCategoryItem } from '../features/trip/tripSlice'
import { openHotelModal, editOverviewCategories } from '../features/modals/modalSlice'

function LodgingItem() {

    const dispatch = useDispatch()
    const { Lodging } = useSelector( state => state.trip )
    const { formatDate } = useDate()
    const { formatTime } = useTime()

    const editHotel = (e, index) => {
        const data = {
            category: e.target.id,
            index
        }

        dispatch(editOverviewCategories(data))
        dispatch(openHotelModal())
    }

    const removeHotel = (e, index) => {
        const data = {
            category: e.target.id,
            index
        }

        dispatch(removeCategoryItem(data))
    }



    return (
        <section className='lodging-container'>
            {Lodging.map( (item, index) => (
                <div className='lodging-info' key={uuidv4()}>
                    <h2>{item.hotel}</h2>
                    <p>{item.hotelAddress}</p>
                    <div>
                        <div className='checkin-info'>
                            <h3 className='section-heading'>Check in:</h3>
                            <p>{formatDate(item.checkinDate)} - {formatTime(item.checkinTime)}</p>
                        </div>

                        <div className='checkout-info'>
                            <h3 className='section-heading'>Check out:</h3>
                            <p>{formatDate(item.checkoutDate)} - {formatTime(item.checkoutTime)}</p>
                        </div>
                    </div>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{item.hotelNotes}</p>

                    <div className='operation-icons'>
                        <button
                            type='button'
                            id='Lodging'
                            onClick={(e) => editHotel(e, index)}
                        >
                            <PencilAltIcon  fill='#2F2E41'/>
                        </button>

                        <button
                            type='button'
                            id='Lodging'
                            onClick={(e) => removeHotel(e, index)}
                        >
                            <TrashIcon fill='#2F2E41' id='Lodging'/>
                        </button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default LodgingItem