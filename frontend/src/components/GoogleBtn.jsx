import { FcGoogle } from 'react-icons/fc'

export default function GoogleBtn({type, googleSignUp}) {
  return (
    <button type={type} className='btn google-btn' onClick={googleSignUp}>
        <FcGoogle className='google-icon'/>
        <p>Log in with Google</p>
    </button>
  )
}
