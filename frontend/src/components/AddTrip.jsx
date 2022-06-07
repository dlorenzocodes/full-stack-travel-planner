import { XIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { closeAddTripModal } from '../features/modals/modalSlice'
import { CalendarIcon } from '@heroicons/react/solid'

function AddTrip() {

  const dispatch = useDispatch()

  const handleCloseModal = () => {
    dispatch(closeAddTripModal())
  }

  return (
    <section 
      className='add-trip-container section-padding'>
        <XIcon fill='#F88747' onClick={handleCloseModal}/>

        <form>
            <h1>Plan a new trip</h1>
            <div className='form-control'>
                <input type="text" placeholder='Enter destination city'/>
            </div>

            <div className='form-control'>
              <div className='dates-container'>
                <span>Dates<i>(Optional)</i></span>
                <div className='dates-wrapper'>
                  <input type='date' id='start-date' placeholder='start date'/>
                  <input type='date' id='end-date'/>
                </div>
              </div>
            </div>

            <button className='btn'>Start planning</button>
        </form>
    </section>
  )
}

export default AddTrip