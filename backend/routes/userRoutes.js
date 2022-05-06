const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userControllers');

router.post('/login', loginUser);

router.post('/', registerUser);


module.exports = router;