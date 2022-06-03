const express = require('express');
const router = express.Router();
const { getPlacesRecomendations } = require('../controllers/placesController');

router.get('/recomendations', getPlacesRecomendations);

module.exports = router;