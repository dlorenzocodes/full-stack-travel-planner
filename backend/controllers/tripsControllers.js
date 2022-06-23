const axios = require('axios');
const { logger } = require('../config/logger');
const { Trip } = require('../models/tripModel');

const getDestinationQuery = async(req, res, next) => {

    const { city } = req.body;
    
    try{
        const imageResponse = await axios.get(`https://pixabay.com/api/?key=${process.env.PEXIBAY_KEY}&q=${city}&image_type=photo&orintation=horizontal&page=1&per_page=3&min_width=1200`);
        const cityResponse = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&formatversion=2&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=${city}`)

        const imageURl = imageResponse.data.hits[0]?.webformatURL;
        const cityInfo = cityResponse.data.query?.pages[0]?.extract;
        const title = cityResponse.data.query?.pages[0]?.title;

        res.send({ imageURl, cityInfo, title });
    }catch(error){
        logger.error(error)
        next(err)
    }
}

const saveTrip = async (req, res, next) => {
    try{
        if(req.user){
            const trip = { ...req.body, user: req.user._id }
            console.log(trip)
            const newTrip = await Trip.create(trip)

            if(!newTrip){
                res.status(400);
                throw new Error('Unable to save trip');
            }

            res.status(201);
            res.send('Trip was successfully created')
        }

    }catch(err){
        console.log(err)
        next(err)
    }
}


module.exports = {
    getDestinationQuery,
    saveTrip
}