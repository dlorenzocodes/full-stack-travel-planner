import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon } from '@heroicons/react/solid'
import { FcGoogle } from 'react-icons/fc'

function Login() {
  return (
    <div className='form-wrapper'>

            <div className='icon-wrapper'>
                    <Link to='/'>
                       <HomeIcon className='icon' fill='#F88747'/>
                    </Link> 
            </div>

            <form>

                <h2>Login to you account</h2>

                <div className='form-control'>
                    <input type="email" name='email' placeholder='email'/>
                </div>

                <div className='form-control'>
                    <input type="password" name='password' placeholder='password'/>
                </div>

                <div className='pw-recovery'>
                  <Link to='/'>Forgot password?</Link>
                </div>

                <div className='form-control'>
                    <button type="submit" className='btn sign-btn'>Log in</button>
                </div>

                <div className='form-control'>
                        <button type="button" className='btn google-btn'>
                            <FcGoogle className='google-icon'/>
                            <p>Log in with Google</p>
                        </button>
                </div>

                <p>Don't have an account yet? <Link to='/register'>Sign up</Link></p>

            </form>

        </div>
  )
}

export default Login