import AddTrip from './AddTrip'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openAddTripModal } from '../features/modals/modalSlice'
import { UserIcon, SearchIcon, PlusCircleIcon } from '@heroicons/react/solid'

function MenuBar() {

  const { addTripModal } = useSelector( state => state.modal )
  const location = useLocation()
  const dispatch = useDispatch()

  const handleAddTrip = () => dispatch(openAddTripModal())


  if(addTripModal) return <AddTrip />

  return (
    <nav className='menu-bar-container section-padding'>
      <div>
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
    </nav>
  )
}

export default MenuBar