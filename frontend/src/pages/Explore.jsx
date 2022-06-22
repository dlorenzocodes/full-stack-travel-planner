import Search from '../components/Search'
import Suggestions from '../components/Suggestions'
import SignupLoginBtns from '../components/SignupLoginBtns'
import CityModal from '../components/CityModal'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { resetTripState } from '../features/trip/tripSlice'
import { openSearchCityModal } from '../features/modals/modalSlice'

function Explore() {

  const { searchCityModal } = useSelector(state => state.modal)
  const { isError, isSuccess, message } = useSelector( state => state.trip)
  const dispatch = useDispatch()

  useEffect(() => {
    if(isError) {
      toast.error(message)
      dispatch(resetTripState())
    } 

    if(isSuccess) dispatch(openSearchCityModal())
  },[isError, message, isSuccess, dispatch])

  return (
    <div className='container'>
      <Search />
      <Suggestions />
      <SignupLoginBtns />
      { searchCityModal && <CityModal />}
    </div>
  )
}

export default Explore