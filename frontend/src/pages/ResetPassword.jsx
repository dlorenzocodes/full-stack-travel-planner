import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthValidation } from '../hooks/useAuthValidation'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { handleResetPassword, reset, handleTokenVerification } from '../features/auth/authSlice'
import Error from '../components/Error'

function ResetPassword() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const { password, confirmPassword } = formData
  const { validate, errors } = useAuthValidation()
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  const { isLoading, isError, isSuccess, message, isTokenValid } = useSelector( state => state.auth )
  

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    const idParam = searchParams.get('id')
    setToken(tokenParam)
    setUserId(idParam)
  },[searchParams])


  // Check is token is valid
  useEffect(() => {
    if(token && userId){
      const data = { token, id: userId }
      dispatch(handleTokenVerification(data))
    }
  },[searchParams, dispatch, token, userId])

 
  useEffect(() => {
    if(isSuccess){
      toast.info(message)
      dispatch(reset())
      navigate('/login')
    }

    if(isError){
      toast.error(message)
      dispatch(reset())
    }

  }, [dispatch, navigate, isError, isSuccess, message])


  const handleFormData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onBlur = (e) => validate(e.target, password)

  const onSubmit = (e) => {
    e.preventDefault()

    if(password === '' || confirmPassword === ''){
      toast.error('Please enter new password and confirm new password')
      return
    }

    if(errors.password !== null || errors.confirmPassword !== null){
      toast.error('Please fix errors before submitting')
      return
    }

    const data ={
      password,
      confirmPassword,
      token,
      id: userId
    }

    dispatch(handleResetPassword(data))
    setFormData({
      password: '',
      confirmPassword: ''
    })
  }

  if(isLoading) return <Spinner />

  if(!isTokenValid) return <Error />

  return (
    <div className='form-wrapper'>
      <form onSubmit={onSubmit}>
        <h2>Enter your new password</h2>

        <div className='form-control'>
          <input 
            type='password'
            name='password'
            id='password'
            value={password}
            placeholder='New password'
            onBlur={onBlur}
            onChange={handleFormData}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>

        <div className='form-control'>
          <input 
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm new password'
            onBlur={onBlur}
            onChange={handleFormData}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>

        <div className="form-control">
          <button className='btn sign-up-btn'>Update password</button>
        </div>

      </form>
    </div>
  )
}

export default ResetPassword