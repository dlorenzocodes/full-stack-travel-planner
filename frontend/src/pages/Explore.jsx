import Search from '../components/Search'
import Suggestions from '../components/Suggestions'
import SignupLoginBtns from '../components/SignupLoginBtns'
import CityModal from '../components/CityModal'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { resetTripState } from '../features/trip/tripSlice'

function Explore() {

  const { isCityActive, isError, message } = useSelector( state => state.trip)
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      if(isError) toast.error(message)
      dispatch(resetTripState())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div className='container'>
      <Search />
      <Suggestions />
      <SignupLoginBtns />
      { isCityActive && <CityModal />}
    </div>
  )
}

export default Explore