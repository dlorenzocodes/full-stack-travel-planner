import { useState } from 'react'
import Overview from './Overview'
import Expenses from './Expenses'
import Itinerary from './Itinerary'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import CarModal from './modals/CarModal'
import NoteModal from './modals/NoteModal'
import OtherModal from './modals/OtherModal'
import HotelModal from './modals/HotelModal'
import FlightModal from './modals/FlightModal'
import ExpenseModal from './modals/ExpenseModal'
import { useSelector, useDispatch } from 'react-redux'
import { SaveIcon, XIcon } from '@heroicons/react/solid'
import { useNavigate, useLocation } from 'react-router-dom'
import { tripSectionButtons } from '../utils/TripSectionButtons'
import { resetTripState, saveTrip } from '../features/trip/tripSlice'
import { resetDestinationState } from '../features/destination/destinationSlice'
import { closeNewTripForm, closeAddTripModal, resetModals } from '../features/modals/modalSlice'

function NewTrip() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [ dates, setDates ] = useState({
    startDate: '',
    endDate: ''
  })

  const { startDate, endDate } = dates
  const { cityInfo } = useSelector( state => state.destination )
  const { isError, message } = useSelector( state => state.trip )

  const { 
      Flights, 
      Cars, 
      Lodging, 
      Other, 
      Notes, 
      Itinerary: itinerary, 
      Expenses: expenses 
  } = useSelector( state => state.trip )

  const { 
    flightModal, 
    hotelModal, 
    carModal, 
    otherModal, 
    notesModal,
    expenseModal
  } = useSelector( state => state.modal )

  const buttonComponents = {
    Overview: <Overview />,
    Itinerary: <Itinerary />,
    Expenses: <Expenses />
  }

  const style = {
    backgroundImage: `url(${cityInfo.imageURl || 'http://localhost:3000/static/media/fieldimage.9771d9277256011ffd97.jpg'})`
  }

  const [activeComponent, setActiveComponent ] = useState(buttonComponents.Overview)
  const [ isActive, setIsActive ] = useState({
    Overview: true,
    Itinerary: false,
    Expenses: false
  })

  const handleActiveCat = (e, index) => {
    if(e.target.id === index.toString()){
      setIsActive((prevState) => ({
        [e.target.dataset.button]: !prevState[e.target.dataset.button]
      }))
      setActiveComponent(buttonComponents[e.target.dataset.button])
    }
  }

  const closeTripForm = () => {
    dispatch(closeNewTripForm())
    dispatch(closeAddTripModal())
    dispatch(resetDestinationState())
    dispatch(resetTripState())
  }

  const handleTripDates = (e) => {
    setDates((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const handleSaveTrip = () => {
    const tripData = {
      tripTitle: cityInfo.title,
      image: cityInfo.imageName,
      dates: {
        startDate: dates.startDate,
        endDate: dates.endDate
      },
      Flights,
      Cars,
      Lodging,
      Notes,
      Other,
      itinerary,
      expenses
    }

    dispatch(saveTrip(tripData))

    if(isError){
      toast.error(message)
      return
    }

    if(location.pathname !== '/profile') navigate('/profile')
    dispatch(resetModals())
    dispatch(resetDestinationState())
    dispatch(resetTripState())
  }
  

  return (
    <section className='new-trip-container'>
      <section className='trip-background-image' style={style}>
        <div>
          <button 
            type='submit'
            onClick={handleSaveTrip}
          >
            <p>Save trip</p>
            <SaveIcon fill='#F88747'/>
          </button>
          <XIcon fill='#F88747' onClick={closeTripForm}/>
        </div>
      </section>

      <section className='trip-section'>
        <div className='trip-header section-padding'>
            <h1>{cityInfo.title} Trip</h1>
            <div className='trip-dates'>
              <input 
                type="date" 
                name='startDate' 
                id='startDate'
                value={startDate}
                onChange={handleTripDates}
              />
              <input 
                type="date" 
                name='endDate' 
                id='endDate'
                value={endDate}
                onChange={handleTripDates}
              />
            </div>
        </div>

        <section className='trip-categories section-padding'>

          <div className='categories'>
            {tripSectionButtons.map( (btn, index) => (
              <button
                key={uuidv4()}
                type='button'
                id={index}
                data-button={btn}
                className={isActive[btn] ? 'active' : ''}
                onClick={(e) => handleActiveCat(e, index)}
              >
                {btn}
              </button>
            ))}
            
          </div>

          <div className='trip-details'>
            {activeComponent}
          </div>

        </section>
        
      </section>

      { flightModal && <FlightModal /> }
      { hotelModal && <HotelModal /> }
      { carModal && <CarModal /> }
      { otherModal && <OtherModal /> }
      { notesModal && <NoteModal /> }
      { expenseModal && <ExpenseModal />}
    </section>
  )
}

export default NewTrip