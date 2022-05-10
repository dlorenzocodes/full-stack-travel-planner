import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon } from '@heroicons/react/solid'
import { FcGoogle } from 'react-icons/fc'

function SignUp() {
    return (
        <div className='form-wrapper'>

            <div className='icon-wrapper'>
                    <Link to='/'>
                       <HomeIcon className='icon' fill='#F88747'/>
                    </Link> 
            </div>

            <form>

                <h2>Create an account</h2>

                <div className='form-control'>
                    <input type="text" name='name' placeholder='name'/>
                </div>

                <div className='form-control'>
                    <input type="email" name='email' placeholder='email'/>
                </div>

                <div className='form-control'>
                    <input type="password" name='password' placeholder='password'/>
                </div>

                <div className='form-control'>
                    <input type="password" name='confirmPassword' placeholder='confirm password'/>
                </div>

                <div className='form-control'>
                    <button type="submit" className='btn sign-btn'>Sign up</button>
                </div>

                <div className='form-control'>
                        <button type="button" className='btn google-btn'>
                            <FcGoogle className='google-icon'/>
                            <p>Sign up with Google</p>
                        </button>
                </div>

                <p>Already have an account? <Link to='/login'>Log in</Link></p>

            </form>

        </div>
    )
}

export default SignUp