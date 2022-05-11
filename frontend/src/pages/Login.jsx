import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'
import { useState, useEffect } from 'react'
import { HomeIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'


function Login() {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData
    const { isError, isAccountCreated, isLoginSuccess, message } = useSelector( state => state.auth)

    const dispatch = useDispatch()
    const naviagte = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            if(isAccountCreated){
                toast.info(message)
                dispatch(reset())
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [isAccountCreated, message, dispatch])


    useEffect(() => {
        
        if(isError) {
            toast.error(message)
            dispatch(reset())
        }
        if(isLoginSuccess) naviagte('/')

    }, [isError, isLoginSuccess, isAccountCreated, message, naviagte, dispatch])


    const handleForm = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData))
        setFormData({
            email: '',
            password: ''
        })
    }

    return (
        <div className='form-wrapper'>

                <div className='icon-wrapper'>
                        <Link to='/'>
                        <HomeIcon className='icon' fill='#F88747'/>
                        </Link> 
                </div>

                <form onSubmit={onSubmit}>

                    <h2>Login to you account</h2>

                    <div className='form-control'>
                        <input 
                            type="email" 
                            name='email' 
                            placeholder='email'
                            value={email}
                            onChange={handleForm}
                        />
                    </div>

                    <div className='form-control'>
                        <input 
                            type="password" 
                            name='password' 
                            placeholder='password'
                            value={password}
                            onChange={handleForm}
                        />
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