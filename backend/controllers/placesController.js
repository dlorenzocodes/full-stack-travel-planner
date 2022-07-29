const axios = require('axios');
const { logger } = require('../config/logger');
const BASE_URL = 'https://geo.ipify.org/api/v2/country,city?apiKey=';
const GEO_BASE_URL = 'http://api.geonames.org/findNearbyPlaceNameJSON?'
const GOOGLE_BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location'


const getUserCoordinates = async () => {
    try{
        const response = await axios.get(`${BASE_URL}${process.env.GEO_API_KEY}`);
        const data = response.data;

        const coordinates = {
            lat: data.location.lat,
            lng: data.location.lng
        }

        return (coordinates);
    }catch(err){
        logger.error(err);
        return (err.response.data);
    }
};


// @desc   Gets places recomendations
// @route  GET /places/recomendations
// @access Public
const getPlacesRecomendations = async (req, res, next) => {
    try{
        const response = await getUserCoordinates();

        if(response.hasOwnProperty('messages')){
            res.status(response.code);
            // Server Error?
            throw new Error(response.messages);
        }

        const { lat, lng } = response;

        try{
            const placesResponse = await axios.get(`${GEO_BASE_URL}lat=${lat}&lng=${lng}&radius=300&maxRows=4&username=${process.env.GEONAMES_USERNAME}`);
            const attractionsResponse = await axios.get(`${GOOGLE_BASE_URL}=${lat},${lng}&radius=500&type=points_of_intrest&key=${process.env.GOOGLE_KEY}`);
            const cityData = await placesResponse.data;
            const attractionsData = await attractionsResponse.data;

            const newAttractionData = attractionsData.results.slice(1,5);
            const data = [cityData, newAttractionData];
            
            res.send(data);
        }catch(err){
            logger.error(err.response);
            throw new Error(err.response);
        }

    }catch(err){
        next(err);
    }
}

module.exports = {
    getUserCoordinates,
    getPlacesRecomendations
}