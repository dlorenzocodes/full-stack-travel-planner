import { useDispatch } from 'react-redux'
import { closeOtherModal } from '../../features/modals/modalSlice'

function OtherModal() {

  const dispatch = useDispatch()

  const addReservation = () => dispatch(closeOtherModal())

  return (
      <section className='other-modal-container trip-modal'>
        <form>
          <h3>Add reservation</h3>
          <div className='trip-form-control'>
              <input 
                  type='text' 
                  name='other' 
                  id='other' 
                  placeholder='Reservation name'
              />
          </div>

          <div className='trip-form-control'>
              <label>Check in:</label>
              <div className='db-input'>
                  <input 
                      type='date' 
                      name='other-date' 
                      id='other-date' 
                  />

                  <input 
                      type='time' 
                      name='other-time' 
                      id='other-time' 
                  />
              </div>
          </div>

          <div className='trip-form-control'>
              <label>Check out:</label>
              <div className='db-input'>
                  <input 
                      type='date' 
                      name='other-checkout-date' 
                      id='other-checkout-date' 
                  />

                  <input 
                      type='time' 
                      name='other-checkout-time' 
                      id='other-checkout-time' 
                  />
              </div>
          </div>

          <div className='trip-form-control'>
          <textarea 
              name='other-notes' 
              id='other-notes' 
              placeholder='Notes'
              />
          </div>

          <button 
              type='button' 
              className='btn'
              onClick={addReservation}
          >
                  Add reservation
          </button>

        </form>
    </section>
  )
}

export default OtherModal