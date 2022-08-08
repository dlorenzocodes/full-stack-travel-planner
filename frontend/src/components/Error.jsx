import { Link } from 'react-router-dom'
import badRquest from '../assets/badRequest.jpg'

function Error() {
  return (
    <section className='error-container'>
        <p className='pb-1'>Oops, an error has occured!</p>
        <img className='pb-1' src={badRquest} alt="error graphic" />
        <Link to='/'>Back Home</Link>
    </section>
  )
}

export default Error