import { Link } from 'react-router-dom'
import { HomeIcon } from '@heroicons/react/solid'

export default function Icon() {
  return (
    <div className='icon-wrapper'>
        <Link to='/'>
            <HomeIcon className='icon' fill='#F88747'/>
        </Link> 
    </div>
  )
}
