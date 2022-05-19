import Icon from '../components/Icon'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import GoogleBtn from '../components/GoogleBtn'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'
import { invalidInputError } from '../features/error/errorSlice'
import { useAuthValidation } from '../hooks/useAuthValidation'


function Login() {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    })

    const [btnDisabled, setBtnDisbaled] = useState(true)

    const { email, password } = formData
    const { errorMessage } = useSelector(state => state.error)
    const { isError, isAccountCreated, isLoginSuccess, message } = useSelector( state => state.auth)

    const { validate, errors } = useAuthValidation()

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


    useEffect(() => {
        if( email !== '' && password !== '') setBtnDisbaled(false)
        else setBtnDisbaled(true)
    },[email, password])


    const onBlur = (e) => validate(e.target)

    const validatePassword = (e) => dispatch(invalidInputError(e.target.value))

    const handleForm = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(btnDisabled) return

        dispatch(login(formData))
        setFormData({
            email: '',
            password: ''
        })
    }


    return (
        <div className='form-wrapper'>

               <Icon />

                <form onSubmit={onSubmit}>

                    <h2>Login to you account</h2>

                    <div className='form-control'>
                        <input 
                            type="email" 
                            name='email' 
                            placeholder='email'
                            value={email}
                            onBlur={onBlur}
                            onChange={handleForm}
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </div>

                    <div className='form-control'>
                        <input 
                            type="password" 
                            name='password' 
                            placeholder='password'
                            value={password}
                            onBlur={validatePassword}
                            onChange={handleForm}
                        />
                        {errorMessage && <span>{errorMessage}</span>}
                    </div>

                    <div className='pw-recovery'>
                    <Link to='/'>Forgot password?</Link>
                    </div>

                    <div className='form-control'>
                        <Button type='submit' isDisabled={btnDisabled} className='btn sign-btn'>Log in</Button>
                    </div>

                    <div className='form-control'>
                        <GoogleBtn type='button' />
                    </div>

                    <p>Don't have an account yet? <Link to='/register'>Sign up</Link></p>

                </form>

            </div>
    )
}

export default Login