const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userControllers');

router.post('/', registerUser);

router.post('/login', loginUser);


module.exports = router;