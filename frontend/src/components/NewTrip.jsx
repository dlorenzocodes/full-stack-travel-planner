import { useState } from 'react'
import Overview from './Overview'
import Expenses from './Expenses'
import Itinerary from './Itinerary'
import { v4 as uuidv4 } from 'uuid';
import CarModal from './modals/CarModal'
import NoteModal from './modals/NoteModal'
import OtherModal from './modals/OtherModal'
import HotelModal from './modals/HotelModal'
import FlightModal from './modals/FlightModal'
import ExpenseModal from './modals/ExpenseModal'
import { useSelector, useDispatch } from 'react-redux'
import { SaveIcon, XIcon } from '@heroicons/react/solid'
import { resetTripState } from '../features/trip/tripSlice'
import { tripSectionButtons } from '../utils/TripSectionButtons'
import { closeNewTripForm, closeAddTripModal } from '../features/modals/modalSlice'

function NewTrip() {

  const dispatch = useDispatch()
  const { cityInfo } = useSelector( state => state.trip )

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
    dispatch(resetTripState())
  }

  const saveTrip = () => {}
  

  return (
    <section className='new-trip-container'>
      <section className='trip-background-image' style={style}>
        <div>
          <button type='submit'>
            <SaveIcon fill='#F88747' onClick={saveTrip}/>
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