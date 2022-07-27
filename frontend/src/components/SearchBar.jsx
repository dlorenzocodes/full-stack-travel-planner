import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { SearchIcon } from '@heroicons/react/solid'
import { postDestination } from '../features/destination/destinationSlice'

function SearchBar() {

  const [destination, setDestination] = useState('')
  const dispatch = useDispatch()

  const getDestination = (e) => setDestination(e.target.value)

  const handleDestination = () => {
    if( destination === '') {
      toast.error('A destination must be provided!')
      return
    }

    const city = { city: destination }
    dispatch(postDestination(city))
    setDestination('')
  }

  return (
    <div className='search-bar'>
        <input 
          type='text' 
          onChange={getDestination}
          value={destination}
          placeholder='Search for places'
        />
        <div className='icon-wrapper search-icon'>
            <SearchIcon className='icon' fill='#F88747' onClick={handleDestination}/>
        </div>
    </div>
  )
}

export default SearchBar