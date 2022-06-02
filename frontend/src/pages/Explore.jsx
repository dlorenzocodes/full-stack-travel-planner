import Search from '../components/Search'
import Suggestions from '../components/Suggestions'
import SignupLoginBtns from '../components/SignupLoginBtns'

function Explore() {
  return (
    <div className='container'>
      <Search />
      <Suggestions />
      <SignupLoginBtns />
    </div>
  )
}

export default Explore