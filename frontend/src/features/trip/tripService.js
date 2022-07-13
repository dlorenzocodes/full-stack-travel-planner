import axios from 'axios'

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
        '/trips/all-trips', 
        paginationNumber, 
        { withCredentials: true} 
    )

    return await response.data
}

const deleteTrip = async (tripId) => {
    const response = await axios.delete(
        `/trips/${tripId}`,
        { withCredentials: true }
    )

    return await response.data
}

const updateTrip = async (data) => {
    const { tripData } = data
    const response = await axios.put(
        `/trips/${data.tripId}`,
        tripData,
        { withCredentials: true }
    )

    return await response.data
}


const tripService = {
    saveTrip,
    getTrips,
    deleteTrip,
    updateTrip
}

export default tripService