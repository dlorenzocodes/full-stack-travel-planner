const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { validateCityEntry } = require('../utils/tripValidations');
const { protectPrivateRoutes } = require('../middleware/authMiddleware');
const { 
    getDestinationQuery, 
    saveTrip, 
    getAllTrips,
    deleteTrip 
} = require('../controllers/tripsControllers');

router.post('/city-info',validate(validateCityEntry),getDestinationQuery);

router.post('/',protectPrivateRoutes, saveTrip);

router.post('/all-trips',protectPrivateRoutes, getAllTrips);

router.delete('/:tripId', protectPrivateRoutes, deleteTrip)

router.put('/:tripId', protectPrivateRoutes, deleteTrip)


module.exports = router;