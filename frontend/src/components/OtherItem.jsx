import { v4 as uuidv4 } from 'uuid';
import useDate from '../hooks/useDate'
import useTime from '../hooks/useTime'
import { useSelector, useDispatch } from 'react-redux'
import { removeCategoryItem } from '../features/trip/tripSlice'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { openOtherModal, editOverviewCategories } from '../features/modals/modalSlice'

function OtherItem() {

    const dispatch = useDispatch()
    const { formatDate } = useDate()
    const { formatTime } = useTime()
    const { Other } = useSelector( state => state.trip )

    const editOther = (e, index) => {
        const data = {
            category: e.target.id,
            index
        }
        dispatch(editOverviewCategories(data))
        dispatch(openOtherModal())
    }

    const removeOther = (e, index) => {
        if(window.confirm('Are you sure you want to delete?')){
            const data = {
                category: e.target.id,
                index
            }
            dispatch(removeCategoryItem(data))
        }
    }

    return (
        <section className='other-container'>
            {Other.map( (item, index) => (
                <div className='other-info' key={uuidv4()}>
                    <h2>{item.reservationName}</h2>
                    <div>
                        <div className='checkin-info'>
                            <h3 className='section-heading'>Check in:</h3>
                            <p>{formatDate(item.otherDate)} - {formatTime(item.otherTime)}</p>
                        </div>

                        <div className='checkout-info'>
                            <h3 className='section-heading'>Check out:</h3>
                            <p>{formatDate(item.otherCheckoutDate)} - {formatTime(item.otherCheckoutTime)}</p>
                        </div>
                    </div>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{item.otherNotes}</p>

                    <div className='operation-icons'>
                        <button
                            type='button'
                            id='Other'
                            onClick={(e) => editOther(e, index)}
                        >
                            <PencilAltIcon  fill='#2F2E41' />
                        </button>

                        <button
                            type='button'
                            id='Other'
                            onClick={(e) => removeOther(e, index)}
                        >
                            <TrashIcon fill='#2F2E41' />
                        </button>
                
                    </div>
                </div>
            ))}
        </section>
    )
}

export default OtherItem