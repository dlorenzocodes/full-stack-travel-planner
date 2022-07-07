import Search from '../components/Search'
import Suggestions from '../components/Suggestions'
import SignupLoginBtns from '../components/SignupLoginBtns'
import CityModal from '../components/CityModal'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { openSearchCityModal } from '../features/modals/modalSlice'
import { resetDestinationState } from '../features/destination/destinationSlice'

function Explore() {

  const { searchCityModal } = useSelector( state => state.modal )
  const { isError, isSuccess, message } = useSelector( state => state.destination )
  const dispatch = useDispatch()

  useEffect(() => {
    if(isError) {
      toast.error(message)
      dispatch(resetDestinationState())
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