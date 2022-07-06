import axios from 'axios'

const postCityDestination = async (city) => {
    const response = await axios.post(
        'trips/city-info', 
        city, 
        { withCredentials: true }
    )
    return await response.data
}

const saveTrip = async (tripData) => {
    const response = await axios.post(
        'trips', 
        tripData, 
        { withCredentials: true}
    )
    return await response.data
}

const getTrips = async (paginationNumber) => {
    const response = await axios.post(
        'trips/all-trips', 
        paginationNumber, 
        { withCredentials: true} 
    )

    return await response.data
}

const deleteTrip = async (tripId) => {
    const response = await axios.delete(
        `trips/${tripId}`,
        { withCredentials: true }
    )

    return await response.data
}


const tripService = {
    postCityDestination,
    saveTrip,
    getTrips,
    deleteTrip
}

export default tripService