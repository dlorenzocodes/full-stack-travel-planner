import { useEffect } from 'react'
import Search from '../components/Search'
import MenuBar from '../components/MenuBar'
import { useSearchParams } from 'react-router-dom'
import Suggestions from '../components/Suggestions'
import { useDispatch  } from 'react-redux'
import { getCurrentUser } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'

function Home() {

  const { addTripModal } = useSelector( auth => auth.modal )

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

  return (
    <div 
      className={ addTripModal ? 'container isModal' : 'container'}
    >
      <Search />
      <Suggestions />
      <MenuBar />
    </div>
  )
}

export default Home