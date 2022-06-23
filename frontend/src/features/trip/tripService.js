import axios from 'axios'

const postCityDestination = async (city) => {
    const response = await axios.post('/trips/city-info', city, { withCredentials: true })
    return await response.data
}

const saveTrip = async (tripData) => {
    const response = await axios.post('/trips', tripData, { withCredentials: true} )
    return await response.data
}


const tripService = {
    postCityDestination,
    saveTrip
}

export default tripService