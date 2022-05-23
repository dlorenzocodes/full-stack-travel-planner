import { Link } from 'react-router-dom'

function SignupLoginBtns() {
  return (
    <div className='sign-login-btns-container section-padding'>
      <Link to='/register' className='btn sign-up'>Sign up</Link>
      <Link to='/login' className='btn'>Log in</Link>
    </div>
  )
}

export default SignupLoginBtns