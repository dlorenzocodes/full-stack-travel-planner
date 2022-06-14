import { useState } from 'react'
import Overview from './Overview'
import Expenses from './Expenses'
import Itinerary from './Itinerary'
import CarModal from './modals/CarModal';
import NoteModal from './modals/NoteModal';
import OtherModal from './modals/OtherModal';
import HotelModal from './modals/HotelModal';
import FlightModal from './modals/FlightModal';
import { useSelector, useDispatch } from 'react-redux'
import { SaveIcon, XIcon } from '@heroicons/react/solid'
import { resetTripState } from '../features/trip/tripSlice'
import { closeNewTripForm, closeAddTripModal } from '../features/modals/modalSlice'

function NewTrip() {

  const { cityInfo } = useSelector( state => state.trip )
  const { 
    flightModal, 
    hotelModal, 
    carModal, 
    otherModal, 
    notesModal 
  } = useSelector( state => state.modal )
  const dispatch = useDispatch()

  const style = {
    backgroundImage: `url(${cityInfo.imageURl || 'http://localhost:3000/static/media/fieldimage.9771d9277256011ffd97.jpg'})`
  }

  const [isOverview, setIsOverview] = useState(true)
  const [isItinerary, setIsItinerary] = useState(false)
  const [isExpenses, setIsExpenses] = useState(false)


  const handleActiveCat = (e) => {
    if(e.target.id === 'overview'){
      setIsOverview(true)
      setIsItinerary(false)
      setIsExpenses(false)
    } else if(e.target.id === 'itinerary'){
      setIsItinerary(true)
      setIsExpenses(false)
      setIsOverview(false)
    } else{
      setIsExpenses(true)
      setIsOverview(false)
      setIsItinerary(false)
    }
  }

  const closeTripForm = () => {
    dispatch(closeNewTripForm())
    dispatch(closeAddTripModal())
    dispatch(resetTripState())
  }
  

  return (
    <section className='new-trip-container'>
      <section className='trip-background-image' style={style}>
        <div>
          <button type='submit'>
            <SaveIcon fill='#F88747'/>
          </button>
          <XIcon fill='#F88747' onClick={closeTripForm}/>
        </div>
      </section>

      <section className='trip-section'>
        <div className='trip-header section-padding'>
            <h1>{cityInfo.title} Trip</h1>
            <div className='trip-dates'>
              <input type="date" name='start-date'/>
              <input type="date" name='end-date'/>
            </div>
        </div>

        <section className='trip-categories section-padding'>

          <div className='categories'>
            <button 
              type='button' 
              id='overview' 
              onClick={handleActiveCat}
              className={ isOverview ? 'active' : ''}
            >
              Overview
            </button>
            <button 
              type='button' 
              id='itinerary' 
              onClick={handleActiveCat}
              className={ isItinerary ? 'active' : ''}
            > 
              Itinerary
            </button>
            <button 
              type='button' 
              id='expenses' 
              onClick={handleActiveCat}
              className={ isExpenses ? 'active' : ''}
            >
              Expenses
            </button>
          </div>

          <div className='trip-details'>
              { isOverview && <Overview />}
              { isItinerary && <Itinerary />}
              { isExpenses && <Expenses />}
          </div>
        </section>
        
      </section>

      { flightModal && <FlightModal /> }
      { hotelModal && <HotelModal /> }
      { carModal && <CarModal /> }
      { otherModal && <OtherModal /> }
      { notesModal && <NoteModal /> }
    </section>
  )
}

export default NewTrip