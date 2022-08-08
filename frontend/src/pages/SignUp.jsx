import Icon from '../components/Icon'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import GoogleBtn from '../components/GoogleBtn'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuthValidation } from '../hooks/useAuthValidation'
import { register, reset, getGoogleSignUrl } from '../features/auth/authSlice'

function SignUp() {
    const [ formData, setFromData ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { validate, errors } = useAuthValidation()
    const [btnDisabled, setBtnDisbaled] = useState(true)

    const { name, email, password, confirmPassword } = formData
    const { isError, isAccountCreated , message } = useSelector(state => state.auth)


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onBlur = (e) => validate(e.target, password)
        
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


    
    useEffect(() => {
        if(
            name !== '' &&
            email !== '' &&
            password !== '' &&
            confirmPassword !== ''
        ) setBtnDisbaled(false)
        else setBtnDisbaled(true)

    }, [name, email, password, confirmPassword])



    const onSubmit = (e) => {
        e.preventDefault();

        if(btnDisabled) return

        if(
            errors.name !== null ||
            errors.email !== null ||
            errors.password !== null ||
            errors.confirmPassword !== null
        ){
            toast.error('Please fix errors before submitting!')
            return
        }
     
        const userData = { name, email, password, confirmPassword }

        dispatch(register(userData))
        setFromData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    const socialSignIn = () => dispatch(getGoogleSignUrl())


    return (
        <div className='form-wrapper'>

           <Icon />

            <form onSubmit={onSubmit}>

                <h2>Create an account</h2>

                <div className='form-control'>
                    <input 
                        type="text" 
                        name='name' 
                        placeholder='name'
                        value={name}
                        onBlur={onBlur}
                        onChange={handleForm}
                    />
                    {errors.name !== null && <span>{errors.name}</span>}
                </div>

                <div className='form-control'>
                    <input 
                        type="email" 
                        name='email' 
                        placeholder='email'
                        value={email}
                        onBlur={onBlur}
                        onChange={handleForm}
                    />
                    {errors.email !== null && <span>{errors.email}</span>}
                </div>

                <div className='form-control'>
                    <input 
                        type="password" 
                        name='password' 
                        placeholder='password'
                        value={password}
                        onBlur={onBlur}
                        onChange={handleForm}
                    />
                    {errors.password !== null && <span>{errors.password}</span>}
                </div>

                <div className='form-control'>
                    <input 
                        type="password" 
                        name='confirmPassword' 
                        placeholder='confirm password'
                        value={confirmPassword}
                        onBlur={onBlur}
                        onChange={handleForm}
                    />
                    {errors.confirmPassword !== null && <span>{errors.confirmPassword}</span>}
                </div>

                <div className='form-control'>
                    <Button type='submit' isDisabled={btnDisabled} >Sign up</Button>
                </div>

                <div className='form-control'>
                    <GoogleBtn type='button' googleSignUp={socialSignIn}/>  
                </div>
                <p>Already have an account? <Link to='/login'>Log in</Link></p>

            </form>

        </div>
    )
}

export default SignUp