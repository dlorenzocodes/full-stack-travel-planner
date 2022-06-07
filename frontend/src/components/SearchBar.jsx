import { SearchIcon } from '@heroicons/react/solid'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postDestination } from '../features/trip/tripSlice'
import { toast } from 'react-toastify'

function SearchBar() {

  const [destination, setDestination] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()

  const getDestination = (e) => setDestination(e.target.value)

  const handleDestination = () => {
    if( destination === '') {
      toast.error('A destination must be provided!')
      return
    }

    if(location.pathname !== '/profile'){
      const city = { city: destination }
      dispatch(postDestination(city))
      setDestination('')
    } 
  }

  return (
    <div className='search-bar'>
        <input 
          type='text' 
          onChange={getDestination}
          value={destination}
          placeholder={ location.pathname !== '/profile' ? 
            'Search for places' : 
            'Search for trips'
          } 
        />
        <div className='icon-wrapper search-icon'>
            <SearchIcon className='icon' fill='#F88747' onClick={handleDestination}/>
        </div>
    </div>
  )
}

export default SearchBar