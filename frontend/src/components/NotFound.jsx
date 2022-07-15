import { Link } from 'react-router-dom'
import notFound from '../assets/notFound.jpg'

function NotFound() {
  return (
    <section className='not-found-container'>
        <p>Page not found</p>
        <img src={notFound} alt="Not found graphic" />
        <Link to='/'>Back Home</Link>
    </section>
  )
}

export default NotFound