const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { protectPrivateRoutes } = require('../middleware/authMiddleware');
const { validateUser, validateUserLogin } = require('../models/userModel');
const { 
    loginUser, 
    registerUser, 
    getCurrentUser,
    handleUserLogout
} = require('../controllers/userControllers');


router.post('/', validate(validateUser), registerUser);

router.post('/login', validate(validateUserLogin), loginUser);

router.get('/me',protectPrivateRoutes, getCurrentUser);

router.get('/logout', handleUserLogout)

module.exports = router;