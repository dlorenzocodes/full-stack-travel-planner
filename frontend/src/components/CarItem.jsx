import { v4 as uuidv4 } from 'uuid';
import useDate from '../hooks/useDate'
import useTime from '../hooks/useTime'
import { useSelector, useDispatch } from 'react-redux'
import { removeCategoryItem } from '../features/trip/tripSlice'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { openCarModal, editOverviewCategories } from '../features/modals/modalSlice'

function FlightItem() {

    const dispatch = useDispatch()
    const { formatDate } = useDate()
    const { formatTime } = useTime()
    const { Cars } = useSelector( state => state.trip )
    
    const editCars = (e, index) => {
        const data = {
            category: e.target.id,
            index
        }

        dispatch(editOverviewCategories(data))
        dispatch(openCarModal())
    }

    const removeCars = (e, index) => {
        if(window.confirm('Are you sure you want to delete?')){
            const data = {
                category: e.target.id,
                index
            }
            dispatch(removeCategoryItem(data))
        }
    }

    return (
        <section className='cars-container'>
            {Cars.map( (item, index) => (
                <div className='car-info' key={uuidv4()}>
                    <h2>{item.rental}</h2>
                    
                    <div className='reservation-info'>
                        <div className='pickup-info'>
                            <h3 className='section-heading'>Pick up:</h3>
                            <p>{formatDate(item.pickupDate)} - {formatTime(item.pickupTime)}</p>
                            <span>{item.pickupAddress}</span>
                        </div>

                        <div className='dropoff-info'>
                            <h3 className='section-heading'>Drop off:</h3>
                            <p>{formatDate(item.dropoffDate)} - {formatTime(item.dropoffTime)}</p>
                            <span>{item.dropoffAddress}</span>
                        </div>
                    </div>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{item.carNotes}</p>

                    <div className='operation-icons'>
                        <button
                            type='button'
                            id='Cars'
                            onClick={(e) => editCars(e, index)}
                        >
                            <PencilAltIcon  fill='#2F2E41'/>
                        </button>

                        <button
                            type='button'
                            id='Cars'
                            onClick={(e) => removeCars(e, index)}
                        >
                            <TrashIcon fill='#2F2E41' />
                        </button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default FlightItem