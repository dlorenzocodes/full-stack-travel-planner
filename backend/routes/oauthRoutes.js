const express = require('express');
const router = express.Router();
const { googleSocialValidation } = require('../controllers/oauthController')

router.post('/', googleSocialValidation);

module.exports = router;