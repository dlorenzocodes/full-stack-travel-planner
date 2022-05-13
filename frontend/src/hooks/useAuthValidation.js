import { useState } from 'react'


export function useAuthValidation() {
  
    const [ errors, setErrors ] = useState({
        name: null,
        email: null,
        password: null,
        confirmPassword: null
    })


    const setsErrors = (targetName, error) => {
        setErrors((prevState) => ({
            ...prevState,
            [targetName]: error
        }))
    }


    const validate = (target, password) => {
        let pattern
        let errorMsg

        if(target.name === 'name'){
            pattern = /^[A-Za-z]+$/
            errorMsg = pattern.test(target.value) ? null : 'Minimum is 3 characters long. Must contain only letters.'
            setsErrors(target.name, errorMsg)
        } 
        else if(target.name === 'email'){
            pattern = /^[^@]+@[^@.]+\.[a-z]+$/i
            errorMsg = pattern.test(target.value) ? null : 'Please enter a valid email address'
            setsErrors(target.name, errorMsg)
        }
        else if(target.name === 'password'){
            pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            errorMsg = pattern.test(target.value) ? null : `Minimum is 8 characters long. Must contain on lowercase letter, 
            one uppercase letter, one number and one special character.`
            setsErrors(target.name, errorMsg)
        }
        else if(target.name === 'confirmPassword'){
            errorMsg = target.value !== password ? 'Passwords do not match' : null
            setsErrors(target.name, errorMsg)
        } 
    }

   

    return { validate, errors }
}
