import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeCarModal } from '../../features/modals/modalSlice'

function CarModal() {

  const [ isChecked, setIsChecked ] = useState(true)
  const dispatch = useDispatch()

  const addCar = () => dispatch(closeCarModal())
  const onChange = (e) => {
    if(e.target.checked) {
      setIsChecked((prevState) => !prevState)
    }
  }

  return (
    <section className='car-modal-container trip-modal'>
      <form>
        <h3>Add rental car</h3>
        <div className='trip-form-control'>
            <input 
                type='text' 
                name='rental' 
                id='rental' 
                placeholder='Rental car name'
            />
        </div>

        <div className='trip-form-control'>
            <input 
                type='text' 
                name='pickup-address' 
                id='pickup-address' 
                placeholder='Pick up address'
            />
        </div>

        <div className='address-question'>
            <input 
                type='checkbox' 
                id='same-address' 
                placeholder='Pick up address'
                onChange={onChange}
            />
            <label>Is drop off the same address?</label>
        </div>

        <div className='trip-form-control'>
            <input 
                type='text' 
                className={ isChecked ? '' : 'isHidden'}
                name='dropoff-address' 
                id='dropoff-address' 
                placeholder='Drop off address'
            />
        </div>

        <div className='trip-form-control'>
            <label>Pick up:</label>
            <div className='db-input'>
                <input 
                    type='date' 
                    name='pickup-date' 
                    id='pickup-date' 
                />

                <input 
                    type='time' 
                    name='pickup-time' 
                    id='pickup-time' 
                />
            </div>
        </div>

        <div className='trip-form-control'>
            <label>Drop off:</label>
            <div className='db-input'>
                <input 
                    type='date' 
                    name='dropoff-date' 
                    id='dropoff-date' 
                />

                <input 
                    type='time' 
                    name='dropoff-time' 
                    id='dropoff-time' 
                />
            </div>
        </div>

        <div className='trip-form-control'>
        <textarea 
            name='car-notes' 
            id='car-notes' 
            placeholder='Notes'
            />
        </div>

        <button 
            type='button' 
            className='btn'
            onClick={addCar}
        >
                Add rental car
        </button>

      </form>
    </section>
  )
}

export default CarModal