import React from 'react'
import MenuBar from '../components/MenuBar'
import { UserAddIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserLogout, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'


function Profile() {

  const { isError, message } = useSelector(state => state.auth)
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

  return (
    <div className='container'>
        <section className='profile-wrapper'>
          <button type='button' onClick={handleLogout}>Logout</button>
          <div className='profile-image-wrapper'>
            <UserAddIcon fill='#CCC' />
            <h3 className='subheading-text'>Add profile image</h3>
          </div>
        </section>

        <section className='trip-profile-section'>
          Trips
        </section>
      
      <MenuBar />
    </div>
  )
}

export default Profile