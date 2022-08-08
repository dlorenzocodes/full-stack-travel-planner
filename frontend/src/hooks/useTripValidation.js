import { useState } from 'react'

export function useTripValidation(formData) {
  
    const [errors, setErrors] = useState(formData)

    const setsErrors = (targetName, error) => {
        setErrors((prevState) => ({
            ...prevState,
            [targetName]: error
        }))
    }

    const validateTrip = (target) => {
        let pattern
        let errorMsg

        if(
            target.name === 'departure' ||
            target.name === 'arrival' ||
            target.name === 'airline' ||
            target.name === 'hotel'  ||
            target.name === 'rental' ||
            target.name === 'reservationName' ||
            target.name === 'expensePlace'
        ){
            // eslint-disable-next-line
            pattern = /^[A-Za-z\s\/.]*$/
            errorMsg = pattern.test(target.value) ? '' : 'Only letters, period, and spaces are allowed!'
            setsErrors(target.name, errorMsg)
        } else if(
            target.name === 'flightNumber' 
        ){
            pattern = /^[A-Za-z0-9]*$/
            errorMsg = pattern.test(target.value) ? '' : 'Only letters and numbers are allowed!'
            setsErrors(target.name, errorMsg)
        } else if(
            target.name === 'departureDate' ||
            target.name === 'arrivalDate' ||
            target.name === 'checkinDate' ||
            target.name === 'checkoutDate' ||
            target.name === 'pickupDate' ||
            target.name === 'dropoffDate' ||
            target.name === 'otherDate' ||
            target.name === 'otherCheckoutDate' ||
            target.name === 'expenseDate' ||
            target.name === 'date'
        ){
            // eslint-disable-next-line
            pattern = /^\d{4}\-\d{1,2}\-\d{1,2}$/
            errorMsg = pattern.test(target.value) ? '' : 'Make sure date follows the correct format!'
            setsErrors(target.name, errorMsg)

        } else if(
            target.name === 'departureTime' ||
            target.name === 'arrivalTime' ||
            target.name === 'checkinTime' ||
            target.name === 'checkoutTime' ||
            target.name === 'pickupTime' ||
            target.name === 'dropoffTime' ||
            target.name === 'otherTime' ||
            target.name === 'otherCheckoutTime'
        ){
            // eslint-disable-next-line
            pattern = /^\d{1,2}\:\d{1,2}/
            errorMsg = pattern.test(target.value) ? '' : 'Make sure time follows the correct format!'
            setsErrors(target.name, errorMsg)
        } else if(
            target.name === 'hotelAddress' ||
            target.name === 'pickupAddress' ||
            target.name === 'dropoffAddress'
        ){
            // eslint-disable-next-line
            pattern = /^[A-Za-z0-9\s/\.]*$/
            errorMsg = pattern.test(target.value) ? '' : 'Only letters, numbers, period and spaces are allowed!'
            setsErrors(target.name, errorMsg)
        }
    }

    return { validateTrip, errors }
}
