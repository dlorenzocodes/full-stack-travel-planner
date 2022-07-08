import React from 'react'
import Past from '../components/Past'
import { toast } from 'react-toastify'
import NewTrip from '../components/NewTrip'
import { useEffect, useState } from 'react'
import MenuBar from '../components/MenuBar'
import Ongoing from '../components/Ongoing'
import Spinner from '../components/Spinner'
import Upcoming from '../components/Upcoming'
import { getTrips } from '../features/trip/tripSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { resetTripState } from '../features/trip/tripSlice'
import { LogoutIcon, UserAddIcon, RefreshIcon } from '@heroicons/react/solid'
import { handleUserLogout, reset, getCurrentUser } from '../features/auth/authSlice'


function Profile() {

  const [isUpcoming, setIsUpcoming] = useState(true)
  const [isOngoing, setIsOngoing] = useState(false)
  const [isPast, setIsPast] = useState(false)
  const [visibleTrips, setVisibleTrips] = useState(5)
  const { addNewTripForm } = useSelector( state => state.modal)
  const { isError, message, user} = useSelector( state => state.auth )
  const { 
    pagination, 
    isLoading, 
    isSuccess,
    isError: tripError,
    message: tripMessage
  } = useSelector( state => state.trip )
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // check for user --------
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])


  // user logout --------
  useEffect(() => {
    if(isError) toast.error(message)
    dispatch(reset())
  }, [isError, message, dispatch])


  // gets trips when component loads --------
  useEffect(() => {
    dispatch(getTrips({ visibleTrips }))
      .then(() => dispatch(resetTripState()))
  }, [dispatch, visibleTrips])


  // get trips when a trip is added --------
  useEffect(() => {
    if(isSuccess){
      toast.info(tripMessage)
      dispatch(getTrips({ visibleTrips }))
        .then(() => dispatch(resetTripState()))
    }
  }, [isSuccess, dispatch, visibleTrips, tripMessage, user])


  // get trips error message --------
  useEffect(() => {
    const timer = setTimeout(() => {
      if(tripError){
        toast.error(tripMessage)
        dispatch(resetTripState())
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [tripError, tripMessage, dispatch])



  const handleLogout = () => {
      dispatch(handleUserLogout())
        .then(() => navigate('/explore'))
  } 

  const handleTripSelection = (e) => {
    if(e.target.id === 'ongoing'){
      setIsOngoing(true)
      setIsUpcoming(false)
      setIsPast(false)
    } else if(e.target.id === 'past'){
      setIsPast(true)
      setIsUpcoming(false)
      setIsOngoing(false)
    } else{
      setIsUpcoming(true)
      setIsOngoing(false)
      setIsPast(false)
    }
  }

  const loadMore = () => setVisibleTrips((prevState) => prevState + 5)
    

  if(!user) <Navigate to='/explore' />

  return (
    <div className='container'>
        <section className='profile-wrapper'>
          <div className='profile-image-wrapper'>
            <UserAddIcon fill='#CCC' />
            <h3 className='subheading-text'>Add profile image</h3>
          </div>

          <button 
            type='button' 
            className='logout-btn'
            onClick={handleLogout}
          >
            <h3>Logout</h3>
            <LogoutIcon />
          </button>
        </section>

        <section className='trip-profile-section section-padding'>
          <aside>
            <h2>Welcome, {user?.name}!</h2>
          </aside>

          <section className='trip-categories'>
            <div className='categories'>
              <button 
                type='button' 
                id='upcoming'
                className={ isUpcoming ? 'active' : ''}
                onClick={handleTripSelection}
              >
                  Upcoming
              </button>
              <button 
                type='button' 
                id='ongoing'
                className={ isOngoing ? 'active' : ''}
                onClick={handleTripSelection}
              >
                Ongoing
              </button>
              <button 
                type='button' 
                id='past'
                className={ isPast ? 'active' : ''}
                onClick={handleTripSelection}
              >
                Past
              </button>
            </div>
          </section>

          <section className='trip-details'>
            { isLoading && <Spinner />}
            { isUpcoming && <Upcoming />}
            { isOngoing && <Ongoing />}
            { isPast && <Past />}

            <button 
              className={ pagination ? 'refresh-btn show': 'refresh-btn'}
              onClick={loadMore}
            >
              <RefreshIcon fill='#F88747'/>
            </button>

          </section>  

        </section>
      <MenuBar />
      { addNewTripForm && <NewTrip />}
    </div>
  )
}

export default Profile