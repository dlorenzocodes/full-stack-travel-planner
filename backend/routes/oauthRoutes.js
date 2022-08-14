const express = require('express');
const router = express.Router();
const { logger } = require('../config/logger');
const { User } = require('../models/userModel');
const { getGoogleAuthUrl, getGoogleUser } = require('../config/oauth');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    maxAge: 15 * 60 * 1000 
}


router.get('/url', (req, res) => {
    let url = getGoogleAuthUrl();
    return res.send(url);       
});

// Google callback route
router.get('/google-callback', async (req, res, next) => {
    const code = String(req.query.code);
   
    try{
        const user = await getGoogleUser(code);
        
        const exsistingUser = await User.findOne({ email: user.email });

        if(exsistingUser && exsistingUser.strategy !== 'google'){
            return res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
        }

        if(exsistingUser){
            const jwtToken = exsistingUser.generateToken();
            res.cookie('jwt', jwtToken, cookieOptions);
            return res.redirect(`${process.env.CLIENT_URL}/?success=true`);
        }

        try{
            const newUser = await User.create({
                name: user.given_name,
                email: user.email,
                strategy: 'google'
            });

            if(newUser) {
                const jwtToken = newUser.generateToken();
                res.cookie('jwt', jwtToken, cookieOptions);
                res.redirect(`${process.env.CLIENT_URL}/?success=true`);
            }

            req.user = newUser;
        }catch(err){
            res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
            logger.error(err);
        }

        req.user = exsistingUser;

    }catch(err){
        logger.error(err);
        console.log(`Google Error: ${err}`)
    }
});


router.get('/failed', (req, res, next) => {

    try{
        if(!req.user){
            res.status(400);
            throw new Error('Unable to sign you in');
        }
    }catch(err){
        logger.error(err);
        next(err);
    }

});


module.exports = router;