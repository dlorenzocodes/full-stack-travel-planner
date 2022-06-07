const express = require('express');
const router = express.Router();
const { getDestinationQuery } = require('../controllers/tripsControllers');
const validate = require('../middleware/validate');
const { validateCityEntry } = require('../utils/tripValidations');

router.post('/city-info',validate(validateCityEntry),getDestinationQuery);






module.exports = router;