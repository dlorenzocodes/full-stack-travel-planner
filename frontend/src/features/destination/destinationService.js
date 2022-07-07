import axios from "axios"

const postCityDestination = async (city) => {
    const response = await axios.post(
        'trips/city-info', 
        city, 
        { withCredentials: true }
    )
    return await response.data
}

const destinationService = {
    postCityDestination
}

export default destinationService