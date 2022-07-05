import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import useProfileDate from '../hooks/useProfileDate'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function Upcoming() {

  const { Upcoming } = useSelector( state => state.trip )
  const { formatProfileDates } = useProfileDate()
 

  const daysLeft = (entry) => {
    const today = Date.now()
    const date = new Date(entry).getTime()
    const diffMS = Math.abs(date - today)
    const diff = Math.round(diffMS / (24*60*60*1000))
    const s = diff > 1 ? 'days' : 'day'
    return `${diff} ${s} left `
  }

  return (
    <>
     { 
      Upcoming.length === 0 ? 
      <p>No Upcoming Trips</p> :
      <> 
        { Upcoming.map(trip => ((
          <div className='trip-card' key={uuidv4()}>

            <div className='trip-image'>
              <img 
                src={`http://localhost:5000/${trip.image}`} 
                alt='trip destination' 
              />
            </div>

            <div className='trip-information'>
              <p id='days-left'>{daysLeft(trip.dates.startDate)}</p>
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

export default Upcoming