import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthValidation } from '../hooks/useAuthValidation'
import { handleForgotPassword, reset } from '../features/auth/authSlice'

function ForgotPassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const style = { paddingBottom: '0.5rem' }
    const [ email, setEmail ] = useState('')
    const { validate, errors } = useAuthValidation()
    const { isLoading, isSuccess, isError, message } = useSelector( state => state.auth )

    // Display error and success messages
    useEffect(() => {
        if(isSuccess){
            toast.info(message)
            dispatch(reset())
        }

        if(isError){
            toast.error(message)
            dispatch(reset())
        }

    }, [dispatch, isError, isSuccess, message])


    const handleEmail = (e) => {
        setEmail(e.target.value)
        validate(e.target)
    }

    const submitEmail = (e) => {
        e.preventDefault()

        if(email === ''){
            toast.error('Please provide an email!')
            return
        }

        if(errors.email !== null ){
            toast.error('Please fix errors before submitting!')
            return
        }

        dispatch(handleForgotPassword({ email }))
        setEmail('')
        navigate('/forgot-password')
    }

    if(isLoading) return <Spinner />

    return (
        <div className='form-wrapper'>
            <form onSubmit={submitEmail}>
                <h2 style={style}>Update your password</h2>
                <p 
                    className='subheading-text pb-1'
                >
                    Enter your email and select <strong>Send Email</strong>
                </p>

                <div className="form-control">
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        placeholder='email'
                        value={email}
                        onChange={handleEmail}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>

                <div className="form-control no-pt">
                    <button className="btn sign-up-btn">Send Email</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword