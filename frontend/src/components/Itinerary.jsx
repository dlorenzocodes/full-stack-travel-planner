import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux"
import ItineraryItem from "./ItineraryItem"
import { addItinerary } from '../features/trip/tripSlice'

function Itinerary() {

  const dispatch = useDispatch()
  const [ date, setDate ] = useState('')

  const handleDate = (e) => setDate(e.target.value)

  const handleForm = () => {
    if(date === '') {
      toast.error('Please provide a date')
      return
    }
    
    const data = {
      date,
      activities: []
    }
    dispatch(addItinerary(data))
    setDate('')
  }

  return (
      <section className='itinerary-container'>
        <ItineraryItem />
        <form>
          <input 
            type='date' 
            value={date} 
            onChange={handleDate}
          />
          <button 
            type='button' 
            className='btn'
            onClick={handleForm}
          > 
            Add a date
          </button>
        </form>
      </section>
  )
}

export default Itinerary