import { v4 as uuidv4 } from 'uuid'
import useProfileDate from '../hooks/useProfileDate'
import { useSelector, useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { deleteTrip, deleteTripFromUI } from '../features/trip/tripSlice'

function Past() {

  const dispatch = useDispatch()
  const { Past } = useSelector( state => state.trip)
  const { formatProfileDates } = useProfileDate()

  const handleDeleteTrip = (tripId, e, index) => {
    const data = {
      tripIndex: index,
      profileSection: e.target.id
    }
    dispatch(deleteTrip(tripId))
    dispatch(deleteTripFromUI(data))
  }

  return (
    <>
      { 
        Past.length === 0 ? 
        <p>No Past Trips</p> :
        <> 
          { Past.map((trip, index) => ((
            <div className='trip-card' key={uuidv4()}>

              <div className='trip-image'>
                <img 
                  src={`http://localhost:5000/${trip.image}`} 
                  alt='trip destination' 
                />
              </div>

              <div className='trip-information'>
                <p id='trip-title'>Trip to {trip.tripTitle}</p>
                <p id='dates'>
                  {formatProfileDates(trip.dates.startDate)} - {formatProfileDates(trip.dates.endDate)}
                </p>
              </div>

              <div className='operation-icons'>
                <button
                  type='button'
                  id='Past'
                >
                  <PencilAltIcon fill='#2F2E41' />
                </button>

                <button
                  type='button'
                  id='Past' 
                  onClick={(e) => handleDeleteTrip(trip._id, e, index)}
                >
                  <TrashIcon fill='#2F2E41'/>
                </button>
              </div>
            </div>
          )))}
        </>
      }
    </>
  )
}

export default Past