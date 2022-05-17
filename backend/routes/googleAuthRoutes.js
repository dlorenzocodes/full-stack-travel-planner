const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', 
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000/login',
        successRedirect: 'http://localhost:3000/'
    })
);



module.exports = router;