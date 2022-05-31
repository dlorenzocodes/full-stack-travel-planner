const axios = require('axios');
const { logger } = require('../config/logger');
const BASE_URL = 'https://geo.ipify.org/api/v2/country,city?apiKey=';
const GEO_BASE_URL = 'http://api.geonames.org/findNearbyPlaceName?'


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
        return (err.response.data);
    }
};

const getPlacesRecomendations = async (req, res, next) => {
    try{
        const response = await getUserCoordinates();
        console.log(response);

        if(response.hasOwnProperty('messages')){
            res.status(response.code);
            // Server Error?
            throw new Error(response.messages);
        }
        
        const { lat, lng } = response;

        try{
            const placesResponse = await axios.get(`${GEO_BASE_URL}lat=${lat}&lng=${lng}&radius=300&maxRows=4&username=${process.env.GEONAMES_USERNAME}`);
            const data = placesResponse.data;
            res.send(data);
        }catch(err){
            console.log(err.response)
            throw new Error(err.response)
        }

    }catch(err){
        next(err);
    }
}

module.exports = {
    getUserCoordinates,
    getPlacesRecomendations
}