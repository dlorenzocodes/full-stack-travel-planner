import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import { HomeIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'

function SignUp() {
    const [ formData, setFromData ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = formData
    const { isError, isAccountCreated , message } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleForm = (e) => {
        setFromData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
            dispatch(reset())
        }

        if(isAccountCreated) navigate('/login')

    }, [isError, isAccountCreated, message, navigate, dispatch])


    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { name, email, password }

        dispatch(register(userData))
        setFromData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
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

                <h2>Create an account</h2>

                <div className='form-control'>
                    <input 
                        type="text" 
                        name='name' 
                        placeholder='name'
                        value={name}
                        onChange={handleForm}
                    />
                </div>

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

                <div className='form-control'>
                    <input 
                        type="password" 
                        name='confirmPassword' 
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={handleForm}
                    />
                </div>

                <div className='form-control'>
                    <button 
                        type="submit" 
                        className='btn sign-btn'
                    >
                        Sign up
                    </button>
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