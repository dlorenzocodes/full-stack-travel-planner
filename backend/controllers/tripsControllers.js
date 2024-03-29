const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const axios = require('axios');
const { logger } = require('../config/logger');
const { Trip } = require('../models/tripModel');
const { default: mongoose } = require('mongoose');

const p = path.join(__dirname, '../', 'uploads/images.json');


const downloadImage = async (url, filepath) => {
    try{
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        const file = response.data.pipe(fs.createWriteStream(filepath));
        file.on('finsih', () => console.log('Image downloaded!'));
    }catch(err){
        throw new Error(err)
    }
}

const addImages = async(imageTitle, url, filepath) => {
    try{
        let images;
        const data = await fsPromises.readFile(p, 'utf8');

        if(data === ''){
            images = [];
            images.push(imageTitle);
            await fsPromises.writeFile(p, JSON.stringify(images));
            await downloadImage(url, filepath);

        } else{
            const parsedData = JSON.parse(data);
            const img = parsedData.find(item => item === imageTitle);
    
            if(img) return;
    
            images = [...parsedData, imageTitle];
            await fsPromises.writeFile(p, JSON.stringify(images));
           
            await downloadImage(url, filepath);
        }
        
    }catch(err){
       logger.error(err);
       throw new Error(err);
    }
}



// @desc   Gets destination info, imageURl and downloads image
// @route  POST /trips/city-info
// @access Public
const getDestinationQuery = async(req, res, next) => {
    const { city } = req.body; 
    try{
        const imageResponse = await axios.get(`https://pixabay.com/api/?key=${process.env.PEXIBAY_KEY}&q=${city}&image_type=photo&orintation=horizontal&page=1&per_page=3&min_width=1200`);
        const cityResponse = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&formatversion=2&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=${city}`)

        const imageURl = imageResponse.data.hits[0]?.webformatURL;
        const cityInfo = cityResponse.data.query?.pages[0]?.extract;
        const title = cityResponse.data.query?.pages[0]?.title;
        const imageName = `${title}.jpg`;
        const imagePath = path.join(__dirname, '../', 'public/assets', imageName);
        
        await addImages(imageName, imageURl, imagePath);
        
        res.send({ imageURl, cityInfo, title, imageName });

    }catch(error){
        logger.error(error)
        next(error)
    }
}

// @desc   Saves the trips to DB
// @route  POST /trips
// @access Private
const saveTrip = async (req, res, next) => {
    try{
        const trip = { ...req.body, user: req.user._id }
        const newTrip = await Trip.create(trip)

        if(!newTrip){
            res.status(400);
            throw new Error('Unable to save trip');
        }

        res.status(201).send('Trip was successfully created');

    }catch(err){
        logger.error(err)
        next(err)
    }
}


// @desc   Returns trips in sections of 5 by category: Upcoming, Ongoing, Past
// @route  POST /trips/all-trips
// @access Private
const getAllTrips = async (req, res, next) => {
    const visibleTrips = parseInt(req.body.visibleTrips);
    try{
        const totalTrips = await Trip.countDocuments({ user: req.user._id});
        const pagination = visibleTrips >= totalTrips ? false : true
        const trips = await Trip.find({ user: req.user._id})
        .sort({ _id: 'desc'})
        .limit(visibleTrips);

        const upcoming = [];
        const ongoing = [];
        const past = [];
        const today = new Date().getTime()

        trips.forEach( trip => {
            const startDate = new Date(trip.dates.startDate.replace(/-/g, '/')).getTime()
            const endDate = new Date(trip.dates.endDate.replace(/-/g, '/')).getTime()

            if(startDate > today) upcoming.push(trip)
            else if(startDate <= today && endDate >= today) ongoing.push(trip)
            else if(endDate < today) past.push(trip)
        })

        const data = {
            upcoming,
            ongoing,
            past,
            pagination
        }
        
        res.status(200).send(data);

    }catch(err){
        logger.error(err)
        next(new Error('Trips could not be loaded at this time. Try again later!'))
    }
}

// @desc   Deletes a trip
// @route  DELETE /trips/:tripId
// @access Private
const deleteTrip = async (req, res, next) => {
    try{
        const tripId = req.params.tripId;

        if(!mongoose.Types.ObjectId.isValid(tripId)){
            res.status(500);
            throw new Error('Trip could not be fetched. Please try again later!');
        }

        const trip = await Trip.findById(tripId);

        if(!trip){
            res.status(404);
            throw new Error('Trip not found');
        }

        if(trip.user.toString() !== req.user._id){
            res.status(401);
            throw new Error('Not authorized');
        }

        await trip.remove();
        res.status(200).send('Trip successfully deleted!');
    }catch(err){
        logger.error(err);
        next(err);
    }
}

// @desc   Edit a trip
// @route  PUT /trips/:tripId
// @access Private
const updateTrip = async (req, res, next) => {
    try{
        const tripId = req.params.tripId;

        if(!mongoose.Types.ObjectId.isValid(tripId)){
            res.status(500);
            throw new Error('Your trip could not be updated at this moment. Try again');
        }

        const trip = await Trip.findById(tripId); 

        if(!trip){
            res.status(404);
            throw new Error('Trip not found');
        }

        if(trip.user.toString() !== req.user._id){
            res.status(401);
            throw new Error('Not authorized');
        }

        const updatedTrip = await Trip.findByIdAndUpdate(
            tripId,
            req.body,
            { new: true }
        )

        res.status(200).send(updatedTrip);
    }catch(err){
        logger.error(err);
        next(err);
    }
}



// @desc   Edit a trip
// @route  GET /trips/:tripId
// @access Private
const getTrip = async (req, res, next) => {
    try{
        const tripId = req.params.tripId;
             
        if(!mongoose.Types.ObjectId.isValid(tripId)){
            res.status(500);
            throw new Error('Trip could not be fetched. Please try again later!');
        }

        const trip = await Trip.findById(tripId);

        if(!trip){
            res.status(404);
            throw new Error('Trip not found');
        }

        if(trip.user.toString() !== req.user._id){
            res.status(401);
            throw new Error('Not authorized');
        }

        res.status(200).send(trip);
    }catch(err){
        logger.error(err);
        next(err);
    }
}


module.exports = {
    getDestinationQuery,
    saveTrip,
    getAllTrips,
    deleteTrip,
    updateTrip,
    getTrip
}