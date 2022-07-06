import { v4 as uuidv4 } from 'uuid'
import useProfileDate from '../hooks/useProfileDate'
import { useSelector, useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { deleteTrip, deleteTripFromUI } from '../features/trip/tripSlice'

function Ongoing() {

  const dispatch = useDispatch()
  const { Ongoing } = useSelector( state => state.trip)
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
        Ongoing.length === 0 ? 
        <p>No Ongoing Trips</p> :
        <> 
          { Ongoing.map((trip, index) => ((
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
                  id='Ongoing'
                >
                  <PencilAltIcon fill='#2F2E41' />
                </button>

                <button
                  type='button'
                  id='Ongoing' 
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

export default Ongoing