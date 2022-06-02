import axios from "axios";

const getCityRecomendations = async () => {
    const response = await axios.get('/places/recomendations', { withCredentials: true })
    return response.data
}

const recomendationService = {
    getCityRecomendations
}

export default recomendationService
