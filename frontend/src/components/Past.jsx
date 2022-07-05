import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import useProfileDate from '../hooks/useProfileDate'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function Past() {

  const { Past } = useSelector( state => state.trip)
  const { formatProfileDates } = useProfileDate()

  return (
    <>
      { 
        Past.length === 0 ? 
        <p>No Past Trips</p> :
        <> 
          { Past.map(trip => ((
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
                  id='Flights'
                >
                  <PencilAltIcon fill='#2F2E41' />
                </button>

                <button
                  type='button'
                  id='Flights' 
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