import React from 'react'
import { toast } from 'react-toastify'
import NewTrip from '../components/NewTrip'
import { useEffect, useState } from 'react'
import MenuBar from '../components/MenuBar'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { LogoutIcon } from '@heroicons/react/solid'
import { UserAddIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserLogout, reset } from '../features/auth/authSlice'


function Profile() {

  const [isUpcoming, setIsUpcoming] = useState(true)
  const [isOngoing, setIsOngoing] = useState(false)
  const [isPast, setIsPast] = useState(false)

  const { addNewTripForm } = useSelector( state => state.modal)
  const { isError, message, user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isError, message, dispatch])


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
            <h2>Welcome, {user.name}!</h2>
            <SearchBar />
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

        </section>
      
      <MenuBar />
      { addNewTripForm && <NewTrip />}
    </div>
  )
}

export default Profile