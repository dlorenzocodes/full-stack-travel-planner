import { FcGoogle } from 'react-icons/fc'

export default function GoogleBtn({type}) {
  return (
    <button type={type} className='btn google-btn'>
        <FcGoogle className='google-icon'/>
        <p>Log in with Google</p>
    </button>
  )
}
