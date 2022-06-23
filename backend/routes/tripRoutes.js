const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { validateCityEntry } = require('../utils/tripValidations');
const { protectPrivateRoutes } = require('../middleware/authMiddleware');
const { getDestinationQuery, saveTrip } = require('../controllers/tripsControllers');

router.post('/city-info',validate(validateCityEntry),getDestinationQuery);

router.post('/', protectPrivateRoutes, saveTrip);




module.exports = router;