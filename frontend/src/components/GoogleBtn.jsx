import { FcGoogle } from 'react-icons/fc'
import { useLocation } from 'react-router-dom'

export default function GoogleBtn({type, googleSignUp}) {

  const location = useLocation()

  return (
    <button type={type} className='btn google-btn' onClick={googleSignUp}>
        <FcGoogle className='google-icon'/>
        <p>{location.pathname === '/register' ? 'Sign up' : 'Log in'} with Google</p>
    </button>
  )
}
