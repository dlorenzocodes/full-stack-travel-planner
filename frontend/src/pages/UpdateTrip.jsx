import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import Overview from '../components/Overview'
import Expenses from '../components/Expenses'
import Itinerary from '../components/Itinerary'
import { SaveIcon } from '@heroicons/react/solid'
import CarModal from '../components/modals/CarModal'
import { useSelector, useDispatch } from 'react-redux'
import NoteModal from '../components/modals/NoteModal'
import OtherModal from '../components/modals/OtherModal'
import HotelModal from '../components/modals/HotelModal'
import { useNavigate, useParams } from 'react-router-dom'
import FlightModal from '../components/modals/FlightModal'
import ExpenseModal from '../components/modals/ExpenseModal'
import { tripSectionButtons } from '../utils/TripSectionButtons'
import { resetTripState, updateTrip, getTrip } from '../features/trip/tripSlice'


function UpdateTrip() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const param = useParams()

  const [ dates, setDates ] = useState({
    startDate: '',
    endDate: ''
  })
  const { startDate, endDate } = dates

  const { 
    image, 
    tripTitle, 
    isUpdated,
    isSuccess,
    isError,
    message,
    dates: tripDates,
    isLoading 
  } = useSelector( state => state.trip )

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
    backgroundImage: `url( ${`http://localhost:5000/${image}`})`
  }

  const [activeComponent, setActiveComponent ] = useState(buttonComponents.Overview)
  const [ isActive, setIsActive ] = useState({
    Overview: true,
    Itinerary: false,
    Expenses: false
  })


  useEffect(() => {
    if(isUpdated) setDates(tripDates)
  }, [isUpdated, tripDates])


  // gets trip
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getTrip(param.tripId))
    }, 1000)

    return () => clearTimeout(timer)
  },[dispatch, param.tripId])


  // Display msg on successfully updated trip
  useEffect(() => {
    if(isSuccess){
      toast.info(message)
      dispatch(resetTripState())
    }
  }, [ isSuccess, message, dispatch])

  
  // Display msg on error getting single trip
  useEffect(() => {
    if(isError){
      toast.error(message)
      dispatch(resetTripState())
      navigate('/profile')
    }
  }, [dispatch, navigate, isError, message])


  const handleActiveCat = (e, index) => {
    if(e.target.id === index.toString()){
      setIsActive((prevState) => ({
        [e.target.dataset.button]: !prevState[e.target.dataset.button]
      }))
      setActiveComponent(buttonComponents[e.target.dataset.button])
    }
  }


  const handleTripDates = (e) => {
    setDates((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }


  const handleUpdateTrip = () => {
    const tripId = param.tripId
    const tripData = {
      tripTitle,
      image,
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
    const data = { tripId, tripData }

    dispatch(updateTrip(data))
    dispatch(resetTripState())
    navigate('/profile')
  }
 

  return (
    <section className='new-trip-container'>
      <section className='trip-background-image' style={style}>
        <div>
          <button 
            type='submit'
            onClick={handleUpdateTrip}
          >
            <p>Save trip</p>
            <SaveIcon fill='#F88747'/>
          </button>
        </div>
      </section>

      <section className='trip-section'>
        <div className='trip-header section-padding'>
            <h1>{tripTitle} Trip</h1>
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
      { isLoading && <Spinner />}
    </section>
  )
}

export default UpdateTrip