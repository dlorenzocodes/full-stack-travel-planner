const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const { validateCityEntry } = require('../utils/tripValidations');
const { protectPrivateRoutes } = require('../middleware/authMiddleware');
const { 
    getDestinationQuery, 
    saveTrip, 
    getAllTrips,
    deleteTrip,
    updateTrip,
    getTrip
} = require('../controllers/tripsControllers');
const { tripSanitizer } = require('../config/tripSanitizer');
const { validateRequestTripSchema } = require('../middleware/validateTripSanitizer');

router.post('/city-info',validate(validateCityEntry),getDestinationQuery);

router.post(
    '/',
    protectPrivateRoutes, 
    tripSanitizer,
    validateRequestTripSchema,
    saveTrip
);

router.post('/all-trips', protectPrivateRoutes, getAllTrips);

router.delete('/:tripId', protectPrivateRoutes, deleteTrip);

router.put(
    '/:tripId', 
    protectPrivateRoutes,
    tripSanitizer,
    validateRequestTripSchema, 
    updateTrip
);

router.get('/:tripId',protectPrivateRoutes, getTrip);


module.exports = router;