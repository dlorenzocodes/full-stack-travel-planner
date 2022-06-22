const axios = require('axios');
const { logger } = require('../config/logger');

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


module.exports = {
    getDestinationQuery
}