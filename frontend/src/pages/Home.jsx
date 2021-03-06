import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Search from '../components/Search'
import MenuBar from '../components/MenuBar'
import NewTrip from '../components/NewTrip'
import CityModal from '../components/CityModal'
import { useSearchParams } from 'react-router-dom'
import Suggestions from '../components/Suggestions'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from '../features/auth/authSlice'
import { resetTripState } from '../features/trip/tripSlice'
import { openSearchCityModal, closedSearchCityModel } from '../features/modals/modalSlice'

function Home() {

  const { 
    addTripModal, 
    addNewTripForm, 
    searchCityModal 
  } = useSelector( state => state.modal )
  const { isError, isSuccess, message } = useSelector( state => state.trip )

  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()



  useEffect(() => {
    const queryparam = searchParams.get('success')
    const timer = setTimeout(() => {
      if(searchParams.get('success') && queryparam){
        dispatch(getCurrentUser())
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchParams, dispatch])

  
  
  useEffect(() => {
    if(addNewTripForm) dispatch(closedSearchCityModel())
  })


  useEffect(() => {
    if(isError) {
      toast.error(message)
      dispatch(resetTripState())
    } 

    if(isSuccess) dispatch(openSearchCityModal())
  },[isError, message, isSuccess, dispatch])


  return (
    <div 
      className={ addTripModal ? 'container isModal' : 'container'}
    >
      <Search />
      <Suggestions />
      <MenuBar />
      { searchCityModal && <CityModal />}
      { addNewTripForm && <NewTrip />}
    </div>
  )
}

export default Home