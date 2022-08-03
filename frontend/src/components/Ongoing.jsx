import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useProfileDate from '../hooks/useProfileDate'
import { useSelector, useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { deleteTrip, deleteTripFromUI, resetTripState } from '../features/trip/tripSlice'

function Ongoing() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tripIndex, setTripIndex] = useState('')
  const [profileSection, setProfileSection] = useState('')
  const { Ongoing, isError, message, isDeleted } = useSelector( state => state.trip )
  const { formatProfileDates } = useProfileDate()

  // alert error if trip not deleted
  useEffect(() => {
    if(isError){
      toast.error(message)
      dispatch(resetTripState())
    }
  }, [isError, message, dispatch])


  // delete trip from UI on success
  useEffect(() => {
      if(isDeleted){
        const data = { tripIndex, profileSection }
        dispatch(deleteTripFromUI(data))

        const timer =setTimeout(() => {
          toast.info(message)
          dispatch(resetTripState())
        }, 1000)
        
        return () => clearTimeout(timer)
      }

  }, [isDeleted, dispatch, message, profileSection, tripIndex])

  

  const handleDeleteTrip = (tripId, e, index) => {
    if(window.confirm('Are you sure you want to delete this trip?')){
      dispatch(deleteTrip(tripId))
      setTripIndex(index)
      setProfileSection(e.target.id)
    }
  }

  const handleTripUpdate = (tripId) => navigate(`/trips/${tripId}`)
  

  return (
    <>
      { 
        Ongoing.length === 0 ? 
        <p className='no-trips-placeholder'>No ongoing trips</p> :
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
                  onClick={() => handleTripUpdate(trip._id)}
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