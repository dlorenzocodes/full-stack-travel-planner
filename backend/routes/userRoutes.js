const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { validateUser } = require('../models/userModel');
const { loginUser, registerUser } = require('../controllers/userControllers');


router.post('/', validate(validateUser), registerUser);

router.post('/login', loginUser);


module.exports = router;