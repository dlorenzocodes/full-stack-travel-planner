import axios from 'axios'

const postCityDestination = async (city) => {
    const response = await axios.post('/trips/city-info', city, { withCredentials: true })
    return await response.data
}


const tripService = {
    postCityDestination
}

export default tripService