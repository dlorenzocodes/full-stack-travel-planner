import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { XIcon } from '@heroicons/react/solid'
import { postDestination } from '../features/trip/tripSlice'
import { closeAddTripModal, openNewTripForm } from '../features/modals/modalSlice'
import { resetTripState } from '../features/trip/tripSlice'


function AddTrip() {

  const { isError, message, isSuccess } = useSelector( state => state.trip )
  const [destination, setDestination] = useState('')
  const dispatch = useDispatch()

  const handleCloseModal = () => dispatch(closeAddTripModal())
  const handleDestination = (e) => setDestination(e.target.value)

  useEffect(() => {
    const timer = setTimeout(() => {   
      if(isError){
        toast.error(message)
        dispatch(resetTripState())
      }
    }, 1000);

    return () => clearTimeout(timer)
  }, [isError, message, dispatch])


  useEffect(() => {
    if(isSuccess) dispatch(openNewTripForm())
  }, [isSuccess, dispatch])
  

  const onSubmit = (e) => {
    e.preventDefault()
    if( destination === '') {
      toast.error('A destination must be provided!')
      return
    }
    const city = { city: destination }
    dispatch(postDestination(city))
    setDestination('')
  }


  return (
    <section className='add-trip-container'>

      <div>
        <XIcon fill='#F88747' onClick={handleCloseModal}/>

        <form className='section-padding' onSubmit={onSubmit}>
            <h1>Plan a new trip</h1>
            <div className='form-control'>
                <input 
                  type="text" name='' 
                  placeholder='Enter destination city'
                  onChange={handleDestination}
                  value={destination}
                />
            </div>

            <button className='btn'>Start planning</button>
        </form>
      </div>

    </section>
  )
}

export default AddTrip