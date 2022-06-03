import { useState, useEffect } from 'react'
import AddTrip from './AddTrip'
import { useLocation, Link } from 'react-router-dom'
import { UserIcon, SearchIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { openAddTripModal } from '../features/modals/modalSlice'

function MenuBar() {

  const { addTripModal } = useSelector( state => state.modal )
  const location = useLocation()
  const dispatch = useDispatch()

  const handleAddTrip = () => {
    dispatch(openAddTripModal())
  }

  if(addTripModal) return <AddTrip />

  return (
    <div className='menu-bar-container section-padding'>
        <Link
            to='/'
            className={ location.pathname === '/' ? 
            'explore-tab centered active' : 
            'explore-tab centered'
            }
          >
            <SearchIcon />
            <h3 className='subheading-text'>Explore</h3>
        </Link>

        <div 
          className='add-trip-tab centered'
          onClick={handleAddTrip}
        >
            <PlusCircleIcon />
            <h3 className='subheading-text'>Add Trip</h3>
        </div>

        <Link 
          to='/profile' 
          className={ location.pathname === '/profile' ? 
          'explore-tab centered active' : 
          'explore-tab centered'}
          >
          <UserIcon />
          <h3 className='subheading-text'>Profile</h3>
        </Link>
    </div>
  )
}

export default MenuBar