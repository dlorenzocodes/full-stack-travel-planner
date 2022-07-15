import React from 'react'
import Past from '../components/Past'
import { toast } from 'react-toastify'
import NewTrip from '../components/NewTrip'
import { useEffect, useState, useRef } from 'react'
import MenuBar from '../components/MenuBar'
import Ongoing from '../components/Ongoing'
import Spinner from '../components/Spinner'
import Upcoming from '../components/Upcoming'
import { getTrips } from '../features/trip/tripSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { resetTripState } from '../features/trip/tripSlice'
import { LogoutIcon, UserAddIcon, RefreshIcon, TrashIcon } from '@heroicons/react/solid'
import { 
  handleUserLogout, 
  reset, 
  getCurrentUser, 
  handleProfileImage, 
  deleteProfileImage 
} from '../features/auth/authSlice'


function Profile() {

  const [isUpcoming, setIsUpcoming] = useState(true)
  const [isOngoing, setIsOngoing] = useState(false)
  const [isPast, setIsPast] = useState(false)
  const [visibleTrips, setVisibleTrips] = useState(5)
  const { addNewTripForm } = useSelector( state => state.modal)
  const { isSuccess, isError, message, user} = useSelector( state => state.auth )
  const { 
    pagination, 
    isLoading, 
    isSuccess: tripSuccess,
    isError: tripError,
    message: tripMessage
  } = useSelector( state => state.trip )
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fileInput = useRef(null)

  const style = {
    backgroundImage: `url(${ !user?.profile ? 'none' : user?.profile })`
  }

  // check for user --------
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])


  // user reducer error & success messages
  useEffect(() => {
    if(isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  useEffect(() => {
    if(isSuccess){
      toast.info(message)
      dispatch(reset())
    }
  }, [isSuccess, message, dispatch])


  // gets trips when component loads --------
  useEffect(() => {
    dispatch(getTrips({ visibleTrips }))
      .then(() => dispatch(resetTripState()))
  }, [dispatch, visibleTrips])


  // get trips when a trip is added --------
  useEffect(() => {
    if(tripSuccess){
      toast.info(tripMessage)
      dispatch(getTrips({ visibleTrips }))
        .then(() => dispatch(resetTripState()))
    }
  }, [tripSuccess, dispatch, visibleTrips, tripMessage, user])


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


  // sends file to server
  useEffect(() => {
    if(file !== null) {
      const formData = new FormData()

      formData.append('avatar', file)
      dispatch(handleProfileImage(formData))
        .then(() => dispatch(getCurrentUser()))
    }
  }, [file, dispatch])



  const handleLogout = () => {
      dispatch(handleUserLogout())
      navigate('/explore')
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

  const handleProfileImageBtn = () => fileInput.current.click()

  const handleProfileImageFile = () => setFile(fileInput.current.files[0])

  const removeProfileImage = () => {
    if(window.confirm('Are you sure you want to delete this image?')){
      dispatch(deleteProfileImage())
        .then(() => dispatch(getCurrentUser()))
    }
  }

  if(!user) <Navigate to='/explore' />

  return (
    <div className='container'>
        <section className='profile-wrapper'>
          <div 
            className='profile-image-wrapper'
            style={style}
          >
             { 
              !user.profile ?
                <form className='avatar'>
                  <button type='button' onClick={handleProfileImageBtn}>
                      <UserAddIcon fill='#CCC' />
                  </button>
                  <input 
                      type='file' 
                      name='avatar' 
                      id='avatar'
                      hidden='hidden'
                      ref={fileInput}
                      onChange={handleProfileImageFile}
                    />
                  <h3 className='subheading-text'>Upload Image</h3>
                </form> :
                <button
                  className='delete-profile-btn'
                  onClick={removeProfileImage}
                >
                  <TrashIcon fill='#2F2E41'/>
                </button>
              }
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
      { isLoading && <Spinner />}
    </div>
  )
}

export default Profile